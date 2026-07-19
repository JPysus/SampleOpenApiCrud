import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Student } from '../types/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  // Using modern inject() to match your component
  private http = inject(HttpClient); 
  private apiUrl = 'http://localhost:5028/api/students';

  // 1. Fetch all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  // 2. Fetch a single student
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  // 3. Add a student (returns Observable<any> or custom response type)
  addStudent(data: Student): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // 4. Edit a student
  editStudent(id: number, data: Student): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // 5. Delete a student
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
