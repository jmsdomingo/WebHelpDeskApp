import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { take } from 'rxjs';
import { EditserviceService } from './editemployee/editservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public employees: Employee[];
  public employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private editEmployeeService: EditserviceService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
  

  public onSearchEmployee(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (
        employee.employeeFirstName.toLowerCase().indexOf(key.toLowerCase()) !==
        -1 ||
        employee.employeeMiddleName.toLowerCase().indexOf(key.toLowerCase()) !==
        -1 ||
        employee.employeeLastName.toLowerCase().indexOf(key.toLowerCase()) !==
        -1
        //Add condition for department
      ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  openEmployeeDialog() {
    const dialogRef = this.dialog.open(AddEmployeeComponent);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((employee: Employee) => { });
  }

  openEmployeeDialogEdit(): void {
    const dialogRef = this.dialog.open(EditemployeeComponent, {data: {employee: this.employee} })
    console.log("result" + dialogRef);
    //const dialogRef = this.dialog.open(EditemployeeComponent, {data: this.employee.employeeFirstName});
    // console.log("result" + dialogRef);
    // dialogRef
    //   .afterClosed()
    //   .subscribe((employee: Employee) => {
    //   });

  }

  openEmployeeDialogDelete() {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((employee: Employee) => { });
  }
}
