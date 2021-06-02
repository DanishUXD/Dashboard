import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { UserService } from 'app/services/admin/user.service';
import { adminMenu } from '../admin-menu';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mobile-user',
  templateUrl: './mobile-user.component.html',
  styleUrls: ['./mobile-user.component.scss'],
})
export class MobileUserComponent implements OnInit {

  constructor(private userService: UserService, private toastrService: NbToastrService) { }
  selected = [];
  columns = [];
  rows = [];
  msgAlert = '';
  ngOnInit(): void {
    this.mobileList();
  }
  page = {
    limit: 15,
    count: 0,
    offset: 0,

  };
  items = adminMenu;
  setPage(event) {
    this.page.offset = event.offset;
    this.mobileList();
  }

  mobileList() {

    // tslint:disable-next-line: deprecation
    this.userService.mobileList(this.page.offset).subscribe(data => {
      if (data.Result === 'Success') {
        this.rows = data.lstUsers;
        this.page.count = data.countUser;
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
