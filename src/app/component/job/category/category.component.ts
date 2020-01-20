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
  category;

  constructor(private route: ActivatedRoute, private jobService: JobService) { }

  ngOnInit() {

    this.route.params.subscribe((data) => {
      this.category = data['category'];
      this.jobService.getAllJob().subscribe((job) => {
        for (var j of job) {
            if(j['category'] == data['category']) {
              this.jobs$.push(j)
            }
        }
      })
    })
  }
}