import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { StudentDashboardComponentComponent } from './components/role/student-dashboard-component/student-dashboard-component.component';
import { MentorDashboardComponentComponent } from './components/role/mentor-dashboard-component/mentor-dashboard-component.component';
import { HodDashboardComponentComponent } from './components/role/hod-dashboard-component/hod-dashboard-component.component';
import { AdminDashboardComponent } from './components/role/admin-dashboard/admin-dashboard.component';
import { UserAuthComponent } from './user/user-auth/user-auth.component';
import { UserHierarchyComponent } from './admin/user-hierarchy/user-hierarchy.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
 
  { path: 'auth' , component:UserAuthComponent},
  
   { path: 'student', component: StudentDashboardComponentComponent },
  { path: 'mentor', component: MentorDashboardComponentComponent },
  { path: 'hod', component: HodDashboardComponentComponent },
  { path: 'admin', component: AdminDashboardComponent },
   { path: 'admin-path', component: UserHierarchyComponent},
   { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
