import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EditserviceService } from '../editemployee/editservice.service';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
  public employees: Employee[];
  public editEmployee: Employee;

  constructor(private dialogRef: MatDialogRef<EditemployeeComponent>,
    private employeeService: EmployeeService,
    private EditserviceService: EditserviceService) { 
    
  }

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

  onNoClick(){
    this.dialogRef.close();
  }

}
