import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbCardComponent, NbCardFooterComponent } from '@nebular/theme';
import { adminMenu } from 'app/admin/admin-menu';
import { UserService } from 'app/services/admin/user.service';
import { SignupService } from 'app/services/signup/signup.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  constructor(private signupService: SignupService
    , private userService: UserService, private toastrService: NbToastrService, private route: Router) { }
  msgAlert = '';
  ngOnInit(): void {
    this.editUser();
    this.getcompany();
  }
  items = adminMenu;
  Arr = Array;
  num: number = 100;
  companyList = [];
  user = {
    userId: sessionStorage.viewUserId,
    userName: '',
    cinemaName: '',
    password: '',
    confrimPassword: '',
  };
  confirmPassword = '';
  editUser() {
    // tslint:disable-next-line: deprecation
    this.userService.getByUserName().subscribe(data => {
      // tslint:disable-next-line: no-console
      if (data.Result === 'Success') {
        this.user.cinemaName = data.userDetails.companyId;
        this.user.userName = data.userDetails.userName;
      //  this.user.beaconsPoint = data.userDetails.totalPoint;
      }
    });
  }

  updateUser() {
    if (this.user.userName === '' || this.user.userName === null) {
      this.msgAlert = 'User Name can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }



    if (this.user.cinemaName === '' || this.user.cinemaName === null) {
      this.msgAlert = 'Cinema Name can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.user.password !== this.user.confrimPassword  ) {
      this.msgAlert = 'Password do not match';
      this.showToast('top-right', 'danger');
      return;
    }


    // tslint:disable-next-line: deprecation
    this.userService.updateuser(this.user).subscribe(data => {
      // tslint:disable-next-line: no-console
      if (data.Result === 'Success') {
        this.msgAlert = 'Successfully Updated User';
        this.showToast('top-right', 'success');
        setTimeout(() => {
          this.route.navigateByUrl('/admin');
        }, 2000);
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    },

    );
  }


  getcompany() {
    // tslint:disable-next-line: deprecation
    this.signupService.listCompany().subscribe(data => {
        this.companyList = data.GetCompany;
    });
  }

  showToast(position, status) {
    this.toastrService.show(
      this.msgAlert, 'Message',
      { position, status, limit: 2 });
  }
}
