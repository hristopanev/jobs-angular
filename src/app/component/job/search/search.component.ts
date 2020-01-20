import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { JobService } from '../../job.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchJob: Job[];
  query: string;

  constructor(private jobService: JobService, private route: ActivatedRoute) {}
  jobs$: Job[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.query = params['search'];
    })

    const query = this.route.snapshot.queryParams['search'];

    this.jobService.getAllJob().subscribe((jobs) => {
        for(var job of jobs) {
          if(job['position'].toLowerCase() == query.toLowerCase() 
          || job['company'].toLowerCase() == query.toLowerCase()
          || job['category'].toLowerCase() == query.toLowerCase()) {
            this.jobs$.push(job)
          }
        }
    })
  }

}
