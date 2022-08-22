import { Department } from './department';

export interface Employee {
  id: number;
  employeeNumber: number;
  employeeFirstName: string;
  employeeMiddleName: string;
  employeeLastName: string;
  employeeDepartment: string;
}
