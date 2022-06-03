import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import * as auth from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  isAuth = false;
  name = "";

  ngOnInit(): void {
    this.changeHeader()
    setTimeout(() => { this.ngOnInit() }, 1000 * 0.3)
    if (!this.isAuth)
      this.router.navigate(['/home']);
  }

  // modifie le contenu du header
  changeHeader(){
    if (localStorage.getItem('currentUser') != null) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
      this.isAuth = currentUser.isAuth;
    } else {
      this.isAuth = false;
    }
  }

  // déconnecte l'utilisateur
  logout() {
    console.log("logout")
    localStorage.removeItem('currentUser');
    this.changeHeader();
    this.router.navigate(['/home']);
  }

}
