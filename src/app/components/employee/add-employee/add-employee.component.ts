import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  departments$ = this.employeeServ.listDepartments();
  public employees: Employee[];

  constructor(
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeServ: EmployeeService
  ) {}

  submit(form: NgForm) {
    this.employeeServ
      .addEmployees(form.value)
      .subscribe((response: Employee) => {
        form.reset();
        this.dialogRef.close();
      });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
