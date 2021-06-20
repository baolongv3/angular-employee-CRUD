import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from 'src/app/model/Employee';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { EmployeeService } from 'src/app/service/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  employees$ : Observable<Employee[]> = new Observable<Employee[]>();
  user : User = <User>{};
  constructor(private empService : EmployeeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user$.subscribe((user: User) => this.user = user);
    this.employees$ = this.empService.getAllEmployee()
    this.employees$.subscribe((emp) => console.log(emp))
  }

  delete(emp : Employee){
    Swal.fire({
      title: 'Do you want to delete this record?',
      icon : 'warning',
      showDenyButton : true,
      confirmButtonColor : '#90ee90',
      confirmButtonText : 'Yes',
      denyButtonText : 'No'
    }).then((result) => {
      if(result.isConfirmed){
        this.empService.deleteId(emp.Id).then(() => {
          Swal.fire({
            title : 'Delete Successfully!',
            icon : 'success',
            showConfirmButton : true
          })
        })
      }else{
        Swal.fire({
          title : 'Delete Cancelled',
          icon : 'warning',
          showConfirmButton : true
        })
      }
    })
  }

}
