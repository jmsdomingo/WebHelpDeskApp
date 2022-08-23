import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EditserviceService } from '../../../services/edit-service.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditemployeeComponent implements OnInit {
  public employees: Employee[];
  public editEmployee: Employee;

  constructor(
    private dialogRef: MatDialogRef<EditemployeeComponent>,
    private employeeService: EmployeeService,
    private EditserviceService: EditserviceService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public submit(form: NgForm): void {
    this.EditserviceService.updateEmployees(form.value).subscribe(
      (response: Employee) => {
        this.getEmployees();
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
