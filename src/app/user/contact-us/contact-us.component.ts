import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { UserLoginService } from 'app/services/userApi/user-login.service';
import { userMenu } from '../user-menu';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {

  constructor(private userLoginService: UserLoginService, private toastrService: NbToastrService) { }
  userDetail = {
    userId: '',
    userName: '',
    totalPoint: '',
  };
  msgAlert = '';
  email = {
    fullName: '',
    emailId: 'harmanbagga0@gmail.com',
    message: '',
  };
  loadavatar = false;
  statusUser = '';
  avatar = '';
  ngOnInit(): void {
    this.userDetail = JSON.parse(sessionStorage.userData);
    this.statusUser = sessionStorage.status;
    this.avatar = sessionStorage.avatar;
    this.loadProfile();

  }
  items = userMenu;
  loadProfile() {

    if (this.avatar === 'null') {
      this.loadavatar = false;
      return;
    } else {
      this.loadavatar = true;
      return;
    }

  }

  sendEmail() {
  // const  email = {
  //     fullName : this.userDetail.userName,
  //     emailId: '',
  //     message  : '',
  //   };
  this.email.fullName = this.userDetail.userName;


    // tslint:disable-next-line: deprecation
    this.userLoginService.sendEmail(this.email).subscribe(data => {
      if (data.Result === 'Success') {
        this.msgAlert = 'Message Successfully Sended';
        this.showToast('top-right', 'success');
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }
  showToast(position, status) {
    this.toastrService.show(
      this.msgAlert, 'Message',
      { position, status, limit: 2});
  }
}
