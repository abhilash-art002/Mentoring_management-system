import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Node, Edge, NgxGraphModule } from '@swimlane/ngx-graph';
import { HttpClient } from '@angular/common/http';
import { curveLinear } from 'd3-shape';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-hierarchy',
  standalone: true,
  imports: [NgxGraphModule,CommonModule,FormsModule],
  templateUrl: './user-hierarchy.component.html',
  styleUrl: './user-hierarchy.component.css',
  
})
export class UserHierarchyComponent implements OnInit {
  nodes: Node[] = [];
  edges: Edge[] = [];
  layout = 'dagre';

  curve = curveLinear;          // ✅ fix for curve
  update$ = new Subject<void>(); // ✅ fix for update$

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buildHierarchy();
  }
  

  buildHierarchy() {
    this.http.get<any[]>('http://localhost:8080/api/users/role/ADMIN').subscribe(admins => {
      const admin = admins[0];
      const adminNodeId = `admin-${admin.id}`;
      this.nodes.push(this.createNode(adminNodeId, admin.name, 'ADMIN', admin.email,admin.profileImage));

      this.http.get<any[]>('http://localhost:8080/api/users/role/HOD').subscribe(hods => {
        hods.forEach(hod => {
          const hodNodeId = `hod-${hod.id}`;
          this.nodes.push(this.createNode(hodNodeId, hod.name, 'HOD', hod.email, hod.profileImage));
          this.edges.push({ source: adminNodeId, target: hodNodeId, label: 'manages' });

          this.http.get<any[]>(`http://localhost:8080/api/users/by-hod/${hod.id}`).subscribe(students => {
            const mentorIds = new Set(students.map(s => s.mentor?.id).filter(id => id));

            mentorIds.forEach(mentorId => {
              this.http.get<any>(`http://localhost:8080/api/users/${mentorId}`).subscribe(mentor => {
                const mentorNodeId = `mentor-${mentor.id}`;
                this.nodes.push(this.createNode(mentorNodeId, mentor.name, 'MENTOR', mentor.email, mentor.profileImage));
                this.edges.push({ source: hodNodeId, target: mentorNodeId, label: 'assigns' });

                const studentsOfMentor = students.filter(s => s.mentor?.id === mentor.id);
                studentsOfMentor.forEach(student => {
                  const studentNodeId = `student-${student.id}`;
                  this.nodes.push(this.createNode(studentNodeId, student.name, 'STUDENT', student.email, student.profileImage, student.course?.name));
                  this.edges.push({ source: mentorNodeId, target: studentNodeId, label: 'guides' });

                  // Trigger re-render when done
                  this.update$.next(); // ✅ notify ngx-graph to update
                });
              });
            });
          });
        });
      });
    });
  }


createNode(id: string, name: string, role: string, email: string, profileImage?: string, course?: string): Node {
  const colorMap: any = {
    ADMIN: '#e53935',
    HOD: '#fbc02d',
    MENTOR: '#3949ab',
    STUDENT: '#43a047'
  };

  return {
    id,
    label: `${name} (${role})\n${email}${course ? '\n' + course : ''}`,
    data: {
      avatar: profileImage ? `http://localhost:8080/images/${profileImage}` : 'assets/img/default-user.png',
      role,
      color: colorMap[role] || '#9e9e9e'
    }
  };
}

selectedNode: any = null;

onNodeClick(event: any) {
  const [nameWithRole, emailAndCourse] = event.label.split('\n');
  const [name, role] = nameWithRole.split(' (');
  const email = emailAndCourse.split('\n')[0]?.trim();
  const course = emailAndCourse.split('\n')[1]?.trim();

  this.selectedNode = {
    name: name.trim(),
    role: role?.replace(')', '').trim(),
    email,
    course,
    avatar: event.data?.avatar
  };
}
zoomLevel: number = 1;

zoomIn() {
  this.zoomLevel += 0.1;
  this.applyZoom();
}

zoomOut() {
  this.zoomLevel = Math.max(0.1, this.zoomLevel - 0.1);
  this.applyZoom();
}

resetZoom() {
  this.zoomLevel = 1;
  this.applyZoom();
}

applyZoom() {
  const graph = document.querySelector('ngx-graph svg g.zoomable') as SVGGElement;
  if (graph) {
    graph.setAttribute('transform', `scale(${this.zoomLevel})`);
  }
}



}
