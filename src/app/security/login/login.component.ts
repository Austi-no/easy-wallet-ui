import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidatorsService } from './../validator/custom-validators.service';
import { SecurityServiceService } from './../service/security-service.service';
import { SessionServiceService } from './../service/session-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading = false;
  loginForm: any = FormGroup;
  submitted = false
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router, private customValidator: CustomValidatorsService, private service: SecurityServiceService, private session: SessionServiceService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // login() {
  //   this.submitted = true;
  //   this.loading=true;
  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //       return;

  // }

  // this.service.login(this.loginForm.value).subscribe(

  //   (res: any) => {

  //     if (res.access_token) {
  //       this.session.setToken(res.access_token)
  //       this.authenticateAndGetUserRoles(this.loginForm.value);

  //       setTimeout(() => {
  //         this.loading=false;
  //         this.router.navigate(["/"])
  //         this.toastr.success('Login Successful!');
  //        }, 2000);

  //     }
  //   },
  //   (error: any) => {

  //     if (error.status === 401) {
  //     //  console.log("invalid credential");
  //     this.loading=false;
  //      this.toastr.error('invalid credential!');

  //     }

  //   }
  // );

  // }

  login() {
    this.service.login(this.loginForm.value).subscribe((res: any) => {
      console.log(res);

      if (res.success == true) {
        this.session.setToken(res.token)
        this.session.setUser(res.user)
        this.router.navigate(["/"])
        this.toastr.success('Login Successful!', res.message);
      } else {
        this.toastr.error('Error!', res.message);
      }

    })
  }

  authenticateAndGetUserRoles(value: any) {

    this.service.authenticateAndGetUserRoles(value).subscribe(
      (res: any) => {
        console.log(res);
        this.loading = false;
        this.session.setUser(res.data)
        this.session.setUserRole(res.data.roles)
      },
      (error: any) => {

        if (error.status === 401) {
          console.log(error);
          this.loading = false;
          console.log("invalid crendicial");
          this.toastr.error('invalid credential!');

        }
      }
    );
  }
}
