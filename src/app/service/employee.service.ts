import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from '../model/Employee';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private db : AngularFirestore) { }

  public getAllEmployee() : Observable<Employee[]>{
    return this.db.collection<Employee>('employee').snapshotChanges().pipe(map(actions => actions.map(data => ({ 
      ...data.payload.doc.data(),
      Id : data.payload.doc.id
    }))))
      
  }

  public createEmployee(emp : Employee){
    const empData = JSON.parse(JSON.stringify(emp));
    return this.db.collection('employee').add(empData);
  } 

  public getEmployee(id : string) : Observable<Employee|any>{
    return this.db.doc<Employee>('employee/' + id).valueChanges();
  }

  public updateEmployee(id : string, emp : Employee){
      const putData = JSON.parse(JSON.stringify(emp));
      return this.db.doc<Employee>('employee/' + id).update(putData);
  }

  public deleteId(id : string){
    return this.db.doc('employee/'+id).delete();
  }
      
}

