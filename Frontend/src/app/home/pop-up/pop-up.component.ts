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

  // affiche le message voulu
  showMessage(message: string) {
    let doc = document.getElementById("message-box") as HTMLDivElement;

    if (doc != null) {
      doc!.style.display = "block";
      doc.innerHTML = message;

      setTimeout(() => {
        doc.style.display = "none";
      }, 4000);
    }
  }
  
}
