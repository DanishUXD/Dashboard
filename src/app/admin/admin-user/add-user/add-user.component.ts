import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { SignupService } from 'app/services/signup/signup.service';
import { adminMenu } from '../../admin-menu';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private signupService: SignupService,
    private toastrService: NbToastrService,
    private route: Router,
  ) {}
  msgAlert = '';
  confirmPass = '';
  loading = false;
  companyList = [];
  Arr = Array;
  num: number = 100;
  ngOnInit(): void {
    this.getcompany();
  }
  items = adminMenu;
  user = {
    cinemaName: '',
    userName: '',
    password: '',
    confrimPassword: '',
    // beaconsPoint: '',
  };

  addUser() {

    if (this.user.cinemaName === '' || this.user.cinemaName === null) {
      this.msgAlert = 'cinema Name can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }

    if (this.user.userName === '' || this.user.userName === null) {
      this.msgAlert = 'User Name can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.user.password === '' || this.user.password === null) {
      this.msgAlert = 'Password can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.user.confrimPassword === '' || this.user.confrimPassword === null) {
      this.msgAlert = 'Confirm Password can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.user.password !== this.user.confrimPassword) {
      this.msgAlert = 'Password do not match';
      this.showToast('top-right', 'danger');
      return;
    }
    // if (this.user.beaconsPoint === '' || this.user.beaconsPoint === null) {
    //   this.msgAlert = 'Beacons Point can\'t be empty';
    //   this.showToast('top-right', 'danger');
    //   return;
    // }
    this.loading = true;
    // tslint:disable-next-line: deprecation
    this.signupService.resgisterUser(this.user).subscribe((data) => {
      if (data.Result === 'Success') {
        this.msgAlert = 'Successfully Added User';
        this.showToast('top-right', 'success');
        this.loading = false;

        setTimeout(() => {
          this.route.navigateByUrl('/admin');
        }, 2000);
      } else {
        this.msgAlert = data.Msg;
        this.loading = false;

        this.showToast('top-right', 'danger');
      }
    });
  }
  getcompany() {
    // tslint:disable-next-line: deprecation
    this.signupService.listCompany().subscribe((data) => {
      this.companyList = data.GetCompany;
    });
  }
  showToast(position, status) {
    this.toastrService.show(this.msgAlert, 'Message', {
      position,
      status,
      limit: 2,
    });
  }
}
