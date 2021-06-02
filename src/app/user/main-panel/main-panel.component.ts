import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { CinemaAppsService } from 'app/services/beacon-points/beacon-points.service';
import { UserLoginService } from 'app/services/userApi/user-login.service';
import { userMenu } from '../user-menu';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss'],
})
export class MainPanelComponent implements OnInit {

  constructor(private appService: CinemaAppsService, private userLoginService: UserLoginService, private toastrService: NbToastrService) { }
  messages = [];
  userDetail = {
    userName: '',
    companyName: '',
    totalPoint: '',
    userId: '',
    createDate: '',
  };
  loadavatar = false;
  msgAlert = '';
  statusUser = '';
  avatar = '';
  ngOnInit(): void {

    this.avatar = sessionStorage.avatar;
    this.userDetail = JSON.parse(sessionStorage.userData);
    this.statusUser = sessionStorage.status;
    this.loadProfile();
    this.getApps();
  }
  items = userMenu;

  totalPoints = '';

  loadProfile() {

    if (this.avatar === 'null') {
      this.loadavatar = false;
      return;
    } else {
      this.loadavatar = true;
      return;
    }

  }
  getApps() {
    // tslint:disable-next-line: deprecation
    this.appService.getApps(this.userDetail.userId).subscribe(data => {
      if (data.Result === 'Success') {
        this.userDetail.totalPoint = data.UserBeaconCount;
        sessionStorage.totalPoints = data.UserBeaconCount;

      }
    });
  }

  showToast(position, status) {
    this.toastrService.show(
      this.msgAlert, 'Message',
      { position, status, limit: 2 });
  }
}
