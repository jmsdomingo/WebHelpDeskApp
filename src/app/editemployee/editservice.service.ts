import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Employee } from '../employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditserviceService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public updateEmployees(employee: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(`${this.apiServerUrl}/employee/update`, employee)
  }
}
