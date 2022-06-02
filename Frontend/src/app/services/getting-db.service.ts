import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Patries } from 'src/Models/Patries.models';

@Injectable({
  providedIn: 'root'
})
export class GettingDBService {

  constructor(private http : HttpClient) { }

  patries: Patries[] = [];

  patriesSubject = new Subject<Patries[]>();

  emitPatries() {
    this.patriesSubject.next(this.patries);
  }

  getPatries() {
    this.getData().subscribe(
      (data: Patries[]) => {
        this.patries = data;
        this.emitPatries();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  test: Patries[] = [];

  modifyPastrie(Pastrie : Patries) {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    // give a value in the req.body
    this.http.put<Patries>('http://localhost:8000/api/patries', Pastrie, {headers}).subscribe();
  }

  handleError() {
    let errorMessage = 'Error Occured';
    return throwError(() => errorMessage);
  }

  getData() : Observable<Patries[]> {
    // wait 1 second before returning the data
    return this.http.get<Patries[]>('http://localhost:8000/api/patries')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
}
