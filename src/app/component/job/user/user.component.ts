import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job';
import { JobService } from '../../job.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userJob$: Observable<Array<Job>>
  constructor(private JobService: JobService) { }

  ngOnInit() {
    this.userJob$ = this.JobService.getUserJob();
  }
  deleteJob(id) {
    this.JobService.deleteJob(id).subscribe((data) => {
      this.userJob$ = this.JobService.getUserJob();
    })
  }

}
