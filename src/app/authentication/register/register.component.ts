import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm', {static: true}) registerForm: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  reister() {
    this.authService
      .register(this.registerForm.value)
      .subscribe((data) => {
        console.log(data);

        this.router.navigate([ '/login' ]);
      });
  }

}
