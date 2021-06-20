import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/service/employee.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-emp-editor',
  templateUrl: './emp-editor.component.html',
  styleUrls: ['./emp-editor.component.css']
})
export class EmpEditorComponent implements OnInit {
  employee$ : Observable<Employee> = new Observable<Employee>();
  submit : boolean = false;
  empForm = this.formBuilder.group({
    name : ['',Validators.required],
    email : ['',[Validators.required,Validators.email]],
    gender : ['',Validators.required],
    DOB : ['',Validators.required],
    YOE : ['',[Validators.min(0),Validators.max(5),Validators.required]]

  },{updateOn : 'submit'});
  id : string | any;
  constructor(private empService : EmployeeService, private formBuilder : FormBuilder, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) =>{this.id = param.get('id') });
    if(this.id){
      this.employee$ = this.empService.getEmployee(this.id);
      this.employee$.subscribe((emp) => {
        this.empForm.controls['name'].setValue(emp.name);
        this.empForm.controls['email'].setValue(emp.email);
        this.empForm.controls['gender'].setValue(emp.sex);
        this.empForm.controls['DOB'].setValue(emp.DOB);
        this.empForm.controls['YOE'].setValue(emp.YOE);
      })
    }
  }
 
  

  async onSubmit(){
    this.submit = true;
    if(!this.empForm.valid){
      return;
    }
    let newEmployee =  {
      name : this.empForm.controls['name'].value,
      email : this.empForm.controls['email'].value,
      sex : this.empForm.controls['gender'].value,
      DOB : this.empForm.controls['DOB'].value,
      YOE : this.empForm.controls['YOE'].value
    }
    if(!this.id){
      this.empService.createEmployee(<Employee>newEmployee).then(() => {
        Swal.fire({
          icon : 'success',
          title : 'Employee Added!',
          showConfirmButton : true
        }).then(() => {
          this.router.navigate(['/'])
        })
      },(error) => {
        Swal.fire({
          icon : 'error',
          title : 'Employee Failed to add!',
          showConfirmButton : true
        })
      })
      return;
    }
      this.empService.updateEmployee(this.id,<Employee>newEmployee).then(() => {
        Swal.fire({
          icon : 'success',
          title : 'Employee Updated!',
          showConfirmButton : true
        }).then(() => {
          this.router.navigate(['/'])
        })
      },(error) => {
        Swal.fire({
          icon : 'error',
          title : 'Employee Failed to add!',
          showConfirmButton : true
        })
      })
    
    
    
  }



}
