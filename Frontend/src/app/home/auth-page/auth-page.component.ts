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

  // initialise le formulaire de connexion et d'inscription
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

  // récpère les données du formulaire d'inscription
  onRegister() {
    const firstName = this.registerForm.get("firstName")!.value;
    const email = this.registerForm.get("email")!.value;
    const password = this.registerForm.get("password")!.value;
    const confirmPassword = this.registerForm.get("confirmPassword")!.value;

    if (firstName === "" || firstName.length < 3) {
      document.getElementById("register-error-message")!.innerHTML = "Veuillez ajouter un nom valide";
    } else if (email === "" || !this.auth.isEmailValid(email)) {
      document.getElementById("register-error-message")!.innerHTML = "Veuillez ajouter un email valide";
    } else if (password === "" || password.length < 6) {
      document.getElementById("register-error-message")!.innerHTML = "Veuillez ajouter un mot de passe de 6 caractères minimum";
    } else if (confirmPassword === "") {
      document.getElementById("register-error-message")!.innerHTML = "Veuillez confirmer votre mot de passe";
    } else if (password !== confirmPassword) {
      document.getElementById("register-error-message")!.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      document.getElementById("register-error-message")!.innerHTML = "";
      const user = new User(firstName, email, confirmPassword);
      this.auth.addNewUser(user);
      //wait seconds
      setTimeout(() => {
        this.auth.login(email, password);
      }, 500);
    }
  }

  // récpère les données du formulaire de connexion
  onLogin() {
    const email = this.loginForm.get("loginEmail")!.value;
    const password = this.loginForm.get("loginPassword")!.value;

    if (email === "") {
      document.getElementById("login-error-message")!.innerHTML = "Veuillez ajouter un email";
    } else if (password === "") {
      document.getElementById("login-error-message")!.innerHTML = "Veuillez ajouter un mot de passe";
    } else {
      document.getElementById("login-error-message")!.innerHTML = "";
      this.auth.login(email, password);
    }
  }
}
