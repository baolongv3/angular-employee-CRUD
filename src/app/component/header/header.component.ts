import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user : User =<User> {};
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user : User) => this.user = user)
  }

  async login(){
    return this.authService.login();
  }

  async logout(){
    return this.authService.logout();
  }

}
