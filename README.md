Here Mentoring Folder was Frontend Folder in Angular
and Mentoring_Management Folder was springboot 
<img width="1024" height="1536" alt="ChatGPT Image Jul 17, 2025, 09_54_13 AM" src="https://github.com/user-attachments/assets/c7f63db6-6bec-4934-b987-2215bbd16527" />

## 📘 Project Workflow Overview
This project is a **Mentoring Management System** designed to streamline the management of students, mentors, HODs, and courses within an academic institution. Below is a detailed step-by-step explanation of how the system works:

### ✅ 1. Default Admin Setup

* When the application runs **for the first time**, a **default Admin user** is automatically created.
* **Email:** `admin@gmail.com`
* **Password:** `admin`
* *(Note: For demo purposes only. Passwords should be encrypted in production.)*

---

### 🧑‍💼 2. User Registration (Student, Mentor, HOD)

* Users can **sign up** by selecting their role: `STUDENT`, `MENTOR`, or `HOD`.
* On registration, they are stored in the `user` table with their respective role.
* At this point:

  * Students are **not yet assigned** to any course.
  * HODs and Mentors are **awaiting assignment** by Admin.

---

### 🎓 3. Admin Login & Course Management

* The Admin logs in using the default credentials.
* Admin can perform the following actions:

  * **Add new courses** (e.g., MCA, MBA, BTech).
  * **Assign a HOD** to each course from the list of registered HODs.

---

### 👨‍🎓 4. Student Course Selection

* After logging in, students:

  * Choose a course from the available list.
  * Are then linked to that course and its respective HOD.

---

### 👩‍🏫 5. HOD Assigns Mentors to Students

* After being assigned a course by Admin, the HOD:

  * Can view all **students under their course**.
  * Can assign **mentors** to these students from the registered mentors.

---

### 💬 6. Communication Between Student and Mentor

* Once a mentor is assigned to a student:

  * Both student and mentor can **log in to their respective dashboards**.
  * They can **communicate** or **share updates** through a dedicated communication page (e.g., chat or message system).

<img width="1671" height="812" alt="Screenshot 2025-07-16 154124" src="https://github.com/user-attachments/assets/87c37385-0f77-4458-98ff-a3c1a12a7d19" />
<img width="1897" height="832" alt="Screenshot 2025-07-16 172455" src="https://github.com/user-attachments/assets/e9c9b3af-3d0b-43be-948c-9af3e78ca206" />
<img width="1919" height="604" alt="Screenshot 2025-07-16 172515" src="https://github.com/user-attachments/assets/fa1e3082-fa96-4233-b266-7cd09c11ef15" />
<img width="1919" height="873" alt="Screenshot 2025-07-16 172540" src="https://github.com/user-attachments/assets/038c40d6-5080-46e3-8eaa-e2a33c1661fd" />
<img width="1919" height="885" alt="Screenshot 2025-07-16 172708" src="https://github.com/user-attachments/assets/3f974fc8-bd0b-437f-9820-e55388555b3f" />
https://github.com/user-attachments/assets/3e107df6-fe07-4f98-a1e3-91929440b8eb
https://github.com/user-attachments/assets/b3413db9-39b3-4261-bbc9-06ab2af41a1f
https://github.com/user-attachments/assets/6d10bb70-bf0c-43cb-8b60-7fcd92d6603c
https://github.com/user-attachments/assets/814e36c7-226a-4a5f-9a63-0d5be257f837










