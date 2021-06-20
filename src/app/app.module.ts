import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './component/list/list.component';
import { HomeComponent } from './component/home/home.component';
import { DetailComponent } from './component/detail/detail.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Page404Component } from './component/error/page404/page404.component';
import { AngularFireModule } from '@angular/fire';
import {  AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { EmpEditorComponent } from './component/emp-editor/emp-editor.component';
import { AdminGuard } from './guard/admin.guard';



const route = [
  {
    path : '',
    component: HomeComponent
  },
  {
    path:'detail/:id',
    component: DetailComponent
  },
  {
    path:'edit/:id',
    component: EmpEditorComponent,
    canActivate: [AdminGuard]
    
  },
  {
    path:'edit',
    component: EmpEditorComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    component: Page404Component
  }
]
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HomeComponent,
    DetailComponent,
    HeaderComponent,
    EmpEditorComponent,
  ],
  imports: [
    RouterModule.forRoot(route),
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.FIREBASE_AUTH),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
