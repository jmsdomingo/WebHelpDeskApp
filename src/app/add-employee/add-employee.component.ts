import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Department } from '../department';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  departments$ = this.employeeServ.listDepartments();
  public employees: Employee[];

  constructor(
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeServ: EmployeeService
  ) {}

  ngOnInit() {
    this.getEmployees();
  }


  public getEmployees(): void {
    this.employeeServ.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  submit(form: NgForm) {
    this.employeeServ.addEmployees(form.value).subscribe((response: Employee) => {
    console.log(response);
    this.getEmployees();
    form.reset();
    this.dialogRef.close();
    window.location.reload();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      form.reset();
    });
  }
  

  onNoClick(){
    this.dialogRef.close();
  }

}
