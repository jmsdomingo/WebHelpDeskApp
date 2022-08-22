import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';
import { Department } from './department';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  listDepartments() {
    return this.http
      .get<Department[]>(`${this.apiServerUrl}/employee/departments`)
  }

  public getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`${this.apiServerUrl}/employee/view`)
  }

  public addEmployees(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(`${this.apiServerUrl}/employee/add`, employee)
  }

  // public updateEmployees(employee: Employee): Observable<Employee> {
  //   return this.http
  //     .put<Employee>(`${this.apiServerUrl}/employee/update`, employee)
  // }

  public deleteEmployees(employeeId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`)
  }
}
