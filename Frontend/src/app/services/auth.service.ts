import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from 'src/Models/user.models';
import { HeaderComponent } from '../home/header/header.component';


export let isAuth = false;

export function set(value: boolean) {
  isAuth = JSON.parse(localStorage.getItem('currentUser')!).isAuth;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private header: HeaderComponent) { }

  handleError() {
    let errorMessage = 'Error Occured';
    return throwError(() => errorMessage);
  }
  
  // récupère les données de l'utilisateur
  getLoginData() : Observable<User[]> {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    return this.http.get<User[]>(`${env.APP_SERVER_API}/api/users`, {headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // ajoute un utilisateur
  addNewUser(user:User) {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    // give a value in the req.body
    this.http.post<User>(`${env.APP_SERVER_API}/api/register`, user, {headers}).subscribe();
  }

  // connecte l'utilisateur
  login(email:string, password:string) {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    let auth = this.http.post<User>(`${env.APP_SERVER_API}/api/login`, {email, password}, {headers}).subscribe(data => {
      if (data) {
        localStorage.setItem('currentUser', JSON.stringify({email: data.email, name: data.firstName, isAuth: true}));
        isAuth = true;
        this.header.changeHeader();
      }
    });
  }
  
  // recupère si l'utilisateur est connecté
  getAuth() {
    let user = JSON.parse(localStorage.getItem('currentUser')!);
    return user.isAuth;
  }

  // déconnecte l'utilisateur
  logout() {
    isAuth = true;
    this.header.changeHeader();
    localStorage.removeItem('currentUser');
  }

  // vérifie si l'email est valide
  isEmailValid(email:string) {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
}
