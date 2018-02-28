import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth_providers/auth.services";
import {AuthModel} from "../auth_providers/auth.model";
import {LoaderService} from "../../../core/_http/loader/loader.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  auth: AuthModel = new AuthModel();
  formLogin: FormGroup;
  message: any;

  matSnackBarVerticalPosition: MatSnackBarVerticalPosition = 'top';

  snackBarSuccesConf: MatSnackBarConfig = {
    duration: 3000,
    extraClasses: ['success-snackbar'],
    verticalPosition: this.matSnackBarVerticalPosition
  };
  snackBarErrorConf: MatSnackBarConfig = {
    duration: 3000,
    extraClasses: ['error-snackbar'],
    verticalPosition: this.matSnackBarVerticalPosition
  };

  constructor(
    private _authservices:AuthService,
    private _loadservice:LoaderService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router:Router) { }

  ngOnInit() {
    this.buildform()
  }

  buildform() {
    this.formLogin = this.fb.group({
      'username': [this.auth.username, Validators.required],
      'password': [this.auth.password, Validators.required],
    });
  }

  login(event) {
    this.auth = event;
    this._loadservice.status('Login ........');
    this._authservices.on_login(this.auth.username, this.auth.password).subscribe(
      (issuccess) => {
        console.log('login');
        //get userdetail
        this.router.navigateByUrl('/home');

      }, (isError) => {
        if (isError === 'Bad credentials') {
          this.message = 'Password Or Username Invalid...';
        } else {
          this.message = isError;
        }
        this.snackBar.open(this.message, '', this.snackBarErrorConf);
      }
    );
    this.router.navigateByUrl('/home');
  }
}
