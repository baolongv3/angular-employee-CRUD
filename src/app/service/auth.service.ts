import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$ : Observable<User> | any;
  constructor(private authService : AngularFireAuth, private route : ActivatedRoute, private router : Router, private db : AngularFirestore) { 
    this.user$ = this.authService.authState.pipe(switchMap( user => {
      if(user) {
        return this.db.doc<User>(`users/${user.uid}`).valueChanges();
      }
      return of(null);
    }
    ))
  }

  public async login(){

    const credential = await this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.updateUserData(credential.user);
  }

  public async logout(){
    return  this.authService.signOut().then(() => {
        this.router.navigate(['/']);
    })
  }

  private updateUserData(user: any){
    const userRef = this.db.doc(`users/${user.uid}`);
    const data = <User>{
      name : user.name,
      email : user.email,
      photoURL : user.photoURL
    }
    return this.db.doc(`users/${user.id}`).set(data, {merge : true});
  }


}
