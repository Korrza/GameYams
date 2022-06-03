import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Patries } from 'src/Models/Patries.models';
import { environment as env } from 'src/environments/environment';

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

  modifyPastrie(Pastrie : Patries) {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    // give a value in the req.body
    this.http.put<Patries>(`${env.APP_SERVER_API}/api/patries`, Pastrie, {headers}).subscribe();
  }

  handleError() {
    let errorMessage = 'Error Occured';
    return throwError(() => errorMessage);
  }

  getData() : Observable<Patries[]> {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    return this.http.get<Patries[]>(`${env.APP_SERVER_API}/api/patries`, {headers})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
}
