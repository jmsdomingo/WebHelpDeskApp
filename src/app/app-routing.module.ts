import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { TicketComponent } from './components/ticket/ticket.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ticket',
  },
  {
    path: 'ticket',
    component: TicketComponent,
  },
  {
    path: 'employee',
    component: EmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
