import { Component, OnInit, inject } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Observable } from 'rxjs';
import { Student } from '../types/student';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
// Look, no "!" needed anymore because it's initialized immediately!
  studentService = inject(StudentsService);
  toasterService = inject(ToastrService);

  students = this.studentService.getStudents();

  ngOnInit(): void {
    this.students;

  }
  delete(id: number) {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        // To refresh the list after a deletion, you just fetch the stream again
        this.students = this.studentService.getStudents();
        this.toasterService.success("Successfully Deleted");
      },
      error: err => {
        console.error(err);
        this.toasterService.error("Failed to delete student"); // Fixed a small typo in your error toast too!
      }
    });
  }
}
