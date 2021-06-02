import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { SignupService } from 'app/services/signup/signup.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  msgAlert = '';
  constructor(private signupService: SignupService, private toastrService: NbToastrService, private route: Router) { }
  points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ngOnInit(): void {
  }
  signUp = {
    companyName: '',
    address: '',
    mobileNo: '',
    email: '',
    userName: '',
    password: '',
    beaconsPoint: '',
  };

  signUpUser() {
    if (this.signUp.companyName === '' || this.signUp.companyName === null) {
      this.msgAlert = 'Company Name can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.signUp.address === '' || this.signUp.address === null) {
      this.msgAlert = 'Address can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.signUp.mobileNo === '' || this.signUp.mobileNo === null) {
      this.msgAlert = 'mobile No can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.signUp.email === '' || this.signUp.email === null) {
      this.msgAlert = 'Email can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.signUp.password === '' || this.signUp.password === null) {
      this.msgAlert = 'Password can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.signUp.beaconsPoint === '' || this.signUp.beaconsPoint === null) {
      this.msgAlert = 'Beacons Point can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    // tslint:disable-next-line: deprecation
    this.signupService.resgisterUser(this.signUp).subscribe(data => {
      // tslint:disable-next-line: no-console
      if (data.Result === 'Success') {
        // tslint:disable-next-line: no-console
        this.route.navigateByUrl('/login');
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }
  showToast(position, status) {
    this.toastrService.show(
      this.msgAlert, 'Message',
      { position, status });
  }
}
