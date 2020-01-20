import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job';
import { Observable } from 'rxjs';


const createJob =	"http://localhost:5000/job/create";
const getAllJob = "http://localhost:5000/job/all";
const getSingleJob = "http://localhost:5000/job/details/";
const deleteJob = "http://localhost:5000/job/delete/";
const getUserJob = "http://localhost:5000/job/user";
const getJobsByCategory = "http://localhost:5000/job/category/";
const search = "http://localhost:5000/job/search";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  createJob(data) {
      return this.http.post(createJob, data);
  } 

  getAllJob(): Observable<Array<Job>> {
    return this.http.get<Array<Job>>(getAllJob);
  }

  getJob(id): Observable<Job> {
    return this.http.get<Job>(getSingleJob + id);
  }

  getUserJob(): Observable<Array<Job>> {
    return this.http.get<Array<Job>>(getUserJob);
  }

  deleteJob(id) {
    return this.http.delete(deleteJob + id);
  }

  getByCategory(category): Observable<Array<Job>> {
    return this.http.get<Array<Job>>(getJobsByCategory + category);
  }

  //search
  search(query: string): Observable<Array<Job>> {
    return this.http.get<Array<Job>>(search + `&query=${query}`)
  }
}
