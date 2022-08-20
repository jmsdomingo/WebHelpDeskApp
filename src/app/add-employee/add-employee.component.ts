import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Department } from '../department';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  departments$ = this.employeeServ.listDepartments();

  constructor(
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeServ: EmployeeService
  ) {}

  ngOnInit(): void {}

  submit(form: NgForm) {
    this.employeeServ.addEmployees(form.value).subscribe((employee) => {
      this.dialogRef.close(employee);
    });
  }
}
