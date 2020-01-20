import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job';
import { JobService } from '../../job.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  jobs$: Job[] = [];

  constructor(private route: ActivatedRoute, private jobService: JobService) { }

  ngOnInit() {

    let cat;
    var alljob: Job[] = [];

    this.route.params.subscribe((data) => {
      cat = data['category'];
      this.jobService.getAllJob().subscribe((job) => {
        for (var j of job) {
            if(j['category'] == data['category']) {
              this.jobs$.push(j)
            }
        }
    
      })
    
      for(var j of this.jobs$) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!")
      }
    })




//    let jobs = [];
//    this.route.params.subscribe((data) => {
//      console.log("TUK!!!!!!!!!!!")
//      let category = data['category'];
//      this.jobService.getJob(category).subscribe((data) => {
//        this.jobs$.push(data)
//      })
//    })
  }
}