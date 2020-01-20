import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-naviagtion',
  templateUrl: './naviagtion.component.html',
  styleUrls: ['./naviagtion.component.css']
})
export class NaviagtionComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  
    this.router.navigate([ '/home' ]);
  }

}
