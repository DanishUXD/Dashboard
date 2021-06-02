import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserService } from 'app/services/admin/user.service';
import { userMenu } from '../user-menu';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'user-change-pass',
  templateUrl: './user-change-pass.component.html',
  styleUrls: ['./user-change-pass.component.scss'],
})
export class UserChangePassComponent implements OnInit {
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
  statusUser = '';
  avatar = '';
  loadavatar = false;
  ngOnInit(): void {
    this.avatar = sessionStorage.avatar;
    this.statusUser = sessionStorage.status;
    this.loadProfile();
  }
  items = userMenu;
  msgAlert = '';

  confirmPassword = '';

  loadProfile() {
    if (this.avatar === 'null') {
      this.loadavatar = false;
      return;
    } else {
      this.loadavatar = true;
      return;
    }
  }
  changePass() {
    // console.log('use'+ localStorage.changeUserName)
    this.change.userName = localStorage.changeUserName;
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
          this.route.navigateByUrl('/user');
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
