import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../job.service';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  job$: Job

  constructor(private route: ActivatedRoute, private jobService: JobService) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      let id = data['id'];
      this.jobService.getJob(id).subscribe((data) => {
        this.job$ = data
      })
    })
  }

}
