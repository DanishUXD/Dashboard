import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { adminMenu } from 'app/admin/admin-menu';
import { UserService } from 'app/services/admin/user.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastrService: NbToastrService,
    private route: Router,
  ) {}
  change = {
    userName: '',
    password: '',
    conPassword: '',
  };
  ngOnInit(): void {}
  items = adminMenu;
  msgAlert = '';

  confirmPassword = '';

  changePass() {
    this.change.userName =  localStorage.changeUserName ;
    if (this.change.password === '' || this.change.password === null) {
      this.msgAlert = 'New Password can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.change.conPassword === '' || this.change.conPassword === null) {
      this.msgAlert = 'Confirm Password can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.change.conPassword !== this.change.password) {
      this.msgAlert = ' Password do not Match';
      this.showToast('top-right', 'danger');
      return;
    }
    // tslint:disable-next-line: deprecation
    this.userService.changePass(this.change).subscribe((data) => {
      if (data.Result === 'Success') {
        this.msgAlert = 'Successfully Changes Password';
        this.showToast('top-right', 'success');
        this.change = {
          userName: '',
          password: '',
          conPassword: '',
        };
        setTimeout(() => {
          this.route.navigateByUrl('/admin');
        }, 3000);
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
