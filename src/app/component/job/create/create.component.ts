import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(private jb: FormBuilder, private jobService: JobService, private router: Router) { }

  ngOnInit() {
    this.form = this.jb.group({
      company: ['', [Validators.required, Validators.minLength(4)]],
      position: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      salary: ['', [Validators.required, Validators.min(0.1)]],
      category: ['', Validators.required],
      image: ['', Validators.required],
      telefon: ['', Validators.nullValidator],
      email: ['', [Validators.required, Validators.email]],
    })
  }


  createJob() {
    this.jobService.createJob(this.form.value).subscribe((data) => {
      this.router.navigate(['/job/all'])
    })
  }

  get job() {
    return this.form.controls;
  }

  get invalid() {
    return this.form.invalid;
  }

}
