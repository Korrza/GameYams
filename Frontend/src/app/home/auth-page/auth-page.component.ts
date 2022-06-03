import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/Models/user.models';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  registerForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    })

    this.loginForm = this.formBuilder.group({
      loginEmail: ["", Validators.required],
      loginPassword: ["", Validators.required],
    })
  }

  onRegister() {
    const firstName = this.registerForm.get("firstName")!.value;
    const email = this.registerForm.get("email")!.value;
    const password = this.registerForm.get("password")!.value;
    const confirmPassword = this.registerForm.get("confirmPassword")!.value;

    if (firstName === "") {
      document.getElementById("error")!.innerHTML = "Veuillez ajouter un nom";
    } else if (email === "") {
      document.getElementById("error")!.innerHTML = "Veuillez ajouter un email";
    } else if (password === "") {
      document.getElementById("error")!.innerHTML = "Veuillez ajouter un mot de passe";
    } else if (confirmPassword === "") {
      document.getElementById("error")!.innerHTML = "Veuillez confirmer votre mot de passe";
    } else if (password !== confirmPassword) {
      document.getElementById("error")!.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      document.getElementById("error")!.innerHTML = "";
      console.log("Nom de famille : " + firstName, "Email : " + email, "Mot de passe : " + password, "Confirmation du mot de passe : " + confirmPassword);
      const user = new User(firstName, email, confirmPassword);
      this.auth.addNewUser(user);
      //wait seconds
      setTimeout(() => {
        this.auth.login(email, password);
      }, 500);
    }
  }

  onLogin() {
    console.log("onLogin");
    const email = this.loginForm.get("loginEmail")!.value;
    const password = this.loginForm.get("loginPassword")!.value;

    if (email === "") {
      document.getElementById("error")!.innerHTML = "Veuillez ajouter un email";
    } else if (password === "") {
      document.getElementById("error")!.innerHTML = "Veuillez ajouter un mot de passe";
    } else {
      document.getElementById("error")!.innerHTML = "";
      this.auth.login(email, password);
      console.log("Email : " + email, "Mot de passe : " + password);
    }
  }
}
