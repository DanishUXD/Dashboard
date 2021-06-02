import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LoginService } from 'app/services/login/login.service';
import { lookup } from 'dns';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  msgAlert = '';
  constructor(
    private loginService: LoginService,
    private toastrService: NbToastrService,
    private route: Router,
  ) {}
  login = {
    userName: '',
    password: '',
  };

  checkRem = false;
  ngOnInit(): void {
    this.checkRem = false;
    this.autoLog();
  }
  logindata = {
    userName: '',
    password: '',
    logged: false,
  };

  remember() {
    // localStorage.log = JSON.stringify(this.logindata);

    this.logindata.userName = this.login.userName;
    this.logindata.password = this.login.password;
    this.logindata.logged = true;
    localStorage.log = JSON.stringify(this.logindata);
  }
  autoLog() {
     this.logindata = JSON.parse(localStorage.log);
    if (this.logindata) {
      if (Boolean(this.logindata.logged) === true) {
        if (this.logindata.userName && this.logindata.password) {
          this.login.userName = this.logindata.userName;
          this.login.password = this.logindata.password;
          this.loginUser();
        }
      }
    }
  }
  loginUser() {

    if (this.login.userName === '' || this.login.userName === null) {
      this.msgAlert = 'User Name can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.login.password === '' || this.login.password === null) {
      this.msgAlert = 'Password can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    // tslint:disable-next-line: deprecation
    this.loginService.loginUser(this.login).subscribe((data) => {
      // tslint:disable-next-line: no-console
      if (data.Result === 'Success') {
        localStorage.changeUserName = data.userDetails.userName;
        sessionStorage.userName = data.userDetails.userName;
        sessionStorage.userId = data.userDetails.userId;
        // console.log('use' + localStorage.changeUserName);
        sessionStorage.logged = 1;
        this.route.navigateByUrl('/admin');
        if (Number(data.userDetails.isAdmin) === 1) {
          sessionStorage.userData = JSON.stringify(data.userDetails);
        } else {
          sessionStorage.avatar = data.userDetails.logo;
          if (Number(data.userDetails.status) === 1) {
            sessionStorage.status = 'Active';
          } else {
            sessionStorage.status = 'InActive';
          }

          // sessionStorage.userData = JSON.stringify(data.userDetails);
          // this.route.navigateByUrl('/user');
          // sessionStorage.logged = 0;
        }
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }
  showToast(position, status) {
    this.toastrService.show(this.msgAlert, 'Message', { position, status });
  }
}
