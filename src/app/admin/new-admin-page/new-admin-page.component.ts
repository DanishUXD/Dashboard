import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { UserService } from 'app/services/admin/user.service';
import { adminMenu } from '../admin-menu';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-admin-page',
  templateUrl: './new-admin-page.component.html',
  styleUrls: ['./new-admin-page.component.scss'],
})
export class NewAdminPageComponent implements OnInit {

  msgAlert = '';
  edit = true;
  page = {
    limit: 5,
    count: 0,
    offset: 0,

  };
  selected = [];
  rows = [];
  columns = [];
  constructor(private userService: UserService, private toastrService: NbToastrService) { }
  userList = {
    userName: '',
    emailId: '',
    totalPoint: '',
    addres: '',
    mobileNo: '',
    companyName: '',
  };
  ngOnInit(): void {
    this.getList();
  }
  items = adminMenu;


  getList() {
    // tslint:disable-next-line: deprecation
    this.userService.userList().subscribe(data => {
      if (data.Result = 'Success') {
        // tslint:disable-next-line: no-console
        this.rows = data.lstUsers;
        this.page.count = data.countUser;
        // tslint:disable-next-line: no-console

      } else {
        alert(data.Msg);
      }
    });
  }

  deleteUser() {
    // tslint:disable-next-line: deprecation
    if (sessionStorage.userName === '' || sessionStorage.userName === null) {
      this.msgAlert = 'Please select a row';
        this.showToast('top-right', 'danger');
        return;
    }
    // tslint:disable-next-line: deprecation
    this.userService.deleteUser().subscribe(data => {
      if (data.Result === 'Success') {
        sessionStorage.userName = '';
        this.selected = [];


        this.msgAlert = 'Successfully Deleted User';
        this.showToast('top-right', 'success');
        this.getList();

      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }
  setPage(pageInfo) {
    this.page.offset = pageInfo.offset;
    this.userService.pageNo = pageInfo.offset;
    // tslint:disable-next-line: deprecation
    this.userService.userList().subscribe(data => {
      if (data.Result = 'Success') {
        // tslint:disable-next-line: no-console

        this.rows = data.lstUsers;
        this.page.count = data.totalUsers;
      }
    });
  }
  onSelect(event) {
    if (event.selected.length <= 1) {
      this.edit = false;
    } else {
      this.edit = true;
    }

    try {
      // tslint:disable-next-line: no-console
      // if (Number(event.selected.length) > 1) {

      // }

      sessionStorage.userName = event.selected[0].userName;
      sessionStorage.userId = event.selected[0].userId;
    } catch (err) {
      sessionStorage.userName = '';
      this.edit = true;
    }
  }
  showToast(position, status) {
    this.toastrService.show(
      this.msgAlert, 'Message',
      { position, status, limit: 2 });
  }
  show(data) {
    // tslint:disable-next-line: no-console
  }

  changeStatus(id) {
    const send = {
      userId: id,
    };
    // tslint:disable-next-line: deprecation
    this.userService.userStatus(send).subscribe(data => {
      if (data.Result === 'Success') {
        // tslint:disable-next-line: no-console
        this.getList();

      } else {
        alert(data.Msg);
      }
    });
  }
}
