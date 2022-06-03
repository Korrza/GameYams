import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class PopUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showMessage(message: string) {

    document.getElementById("message-box")!.style.display = "block";
    document.getElementById("message-box")!.innerHTML = message;

    setTimeout(() => {
      document.getElementById("message-box")!.style.display = "none";
    }, 4000);

  }
  
}
