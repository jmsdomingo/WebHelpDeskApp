import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  employees = new BehaviorSubject<Employee[]>(undefined);

  constructor(private http: HttpClient) {}

  listDepartments() {
    return this.http.get<Department[]>(
      `${this.apiServerUrl}/employee/departments`
    );
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/view`).pipe(
      take(1),
      tap((employees) => {
        this.employees.next([...employees]);
      })
    );
  }

  addEmployees(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(`${this.apiServerUrl}/employee/add`, employee)
      .pipe(
        take(1),
        switchMap((employee) => {
          return this.employees.pipe(
            take(1),
            map((storedEmployees) => {
              this.employees.next([...storedEmployees, employee]);
              return employee;
            })
          );
        })
      );
  }

  // public updateEmployees(employee: Employee): Observable<Employee> {
  //   return this.http
  //     .put<Employee>(`${this.apiServerUrl}/employee/update`, employee)
  // }

  deleteEmployees(employeeId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`)
      .pipe(
        take(1),
        switchMap(() => {
          return this.employees.pipe(
            take(1),
            map((storedEmployees) => {
              const filteredEmployees = storedEmployees.filter(
                (employee) => employee.id !== employeeId
              );
              this.employees.next(filteredEmployees);
            })
          );
        })
      );
  }
}
