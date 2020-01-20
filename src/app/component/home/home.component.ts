import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('j', {static: true}) searchForm: NgForm;

  constructor(private router: Router) {  }

  ngOnInit() {
  }

  search() {
    const query = this.searchForm.value.query;
    this.router.navigate([ 'job/search' ],  { queryParams: {search: query } }  );
  }

}
