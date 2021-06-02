import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { UserLoginService } from 'app/services/userApi/user-login.service';
import {userMenu} from '../user-menu';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'beacon-point',
  templateUrl: './beacon-point.component.html',
  styleUrls: ['./beacon-point.component.scss'],
})
export class BeaconPointComponent implements OnInit {

  constructor(private userLoginService: UserLoginService, private toastrService: NbToastrService) { }
  statusUser = '';
  userDetail: {
    userId: String;
    userName: String;
    totalPoint: String;
  };
  msgAlert = [];
  loadavatar = false;
  avatar = '';
  showEmpty = false;
  ngOnInit(): void {
    this.statusUser = sessionStorage.status;
    this.userDetail = JSON.parse(sessionStorage.userData);
    this.getPoint();
    this.avatar = sessionStorage.avatar;
    this.loadProfile();

  }
  items = userMenu;
  columns = [];
  rows = [];
  points = ['gqw', 'fe', 'fef', 'gfgf', 'gf', 'tr', 'htr'];

  loadProfile() {

    if (this.avatar === 'null') {
      this.loadavatar = false;
      return;
    } else {
      this.loadavatar = true;
      return;
    }

  }

  getPoint() {
    const send = {
      userName: this.userDetail.userName,
    };
    // tslint:disable-next-line: deprecation
    this.userLoginService.listPoint(send).subscribe(data => {
      if (data.Result === 'Success') {
          this.points = data.lstPoints;
          this.rows = data.lstPoints;
          if (this.points.length === 0) {
            this.showEmpty = true;
          }
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }
  showToast(position, status) {
    this.toastrService.show(
      this.msgAlert, 'Message',
      { position, status, limit: 2 });
  }
}
