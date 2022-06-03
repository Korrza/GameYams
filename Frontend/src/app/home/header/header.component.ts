import { Component, Injectable, OnInit } from '@angular/core';
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

  constructor() { }

  isAuth = false;
  name = "";

  ngOnInit(): void {
    this.changeHeader()
    setTimeout(() => { this.ngOnInit() }, 1000 * 0.3)
  }

  changeHeader(){
    if (localStorage.getItem('currentUser') != null) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
      this.isAuth = currentUser.isAuth;
    } else {
      this.isAuth = false;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.changeHeader();
  }

}
