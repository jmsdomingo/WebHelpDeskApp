import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, switchMap, take } from 'rxjs';
import { Employee } from '../../models/employee';
import { EditserviceService } from '../../services/edit-service.service';
import { EmployeeService } from '../../services/employee.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { EditemployeeComponent } from './edit-employee/edit-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  employees$ = this.employeeService.employees.pipe(
    switchMap((employees) => {
      if (employees) return of(employees);
      return this.employeeService.getEmployees();
    })
  );

  constructor(
    private employeeService: EmployeeService,
    private editEmployeeService: EditserviceService,
    private dialog: MatDialog
  ) {}

  onSearchEmployee(key: string): void {
    // console.log(key);
    // const results: Employee[] = [];
    // for (const employee of this.employees) {
    //   if (
    //     employee.employeeFirstName.toLowerCase().indexOf(key.toLowerCase()) !==
    //       -1 ||
    //     employee.employeeMiddleName.toLowerCase().indexOf(key.toLowerCase()) !==
    //       -1 ||
    //     employee.employeeLastName.toLowerCase().indexOf(key.toLowerCase()) !==
    //       -1
    //     //Add condition for department
    //   ) {
    //     results.push(employee);
    //   }
    // }
    // this.employees = results;
    // if (results.length === 0 || !key) {
    //   this.getEmployees();
    // }
  }

  openEmployeeDialog() {
    const dialogRef = this.dialog.open(AddEmployeeComponent);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((employee: Employee) => {});
  }

  openEmployeeDialogEdit(employee: Employee): void {
    const dialogRef = this.dialog.open(EditemployeeComponent, {
      data: { employee },
    });
    dialogRef.afterClosed().subscribe((employee: Employee) => {});
  }

  openEmployeeDialogDelete(employee: Employee) {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: { employee },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((employee: Employee) => {});
  }
}
