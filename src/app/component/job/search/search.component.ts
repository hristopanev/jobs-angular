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

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.query = params['search'];
    })

    const query = this.route.snapshot.queryParams['search'];
    //HERE!
    this.jobService.search(query).subscribe((data) => {
      console.log(data)
      this.searchJob = data['result']
    })

  }

}
