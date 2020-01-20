import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job';
import { JobService } from '../../job.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  jobs$: Observable<Array<Job>>

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobs$ = this.jobService.getAllJob();
  }

}
