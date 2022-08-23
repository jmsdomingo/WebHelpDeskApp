import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
  ) {}

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService
      .deleteEmployees(employeeId)
      .subscribe((response: void) => {
        this.dialogRef.close();
      });
  }
}
