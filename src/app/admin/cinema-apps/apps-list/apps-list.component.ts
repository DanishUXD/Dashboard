import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { CinemaAppsService } from 'app/services/beacon-points/beacon-points.service';
import { adminMenu } from '../../admin-menu';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ppps-list',
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.scss'],
})
export class AppsListComponent implements OnInit {
  constructor(
    private appService: CinemaAppsService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.listApps();
    sessionStorage.removeItem('appId');
    this.selected = [];
  }

  items = adminMenu;
  rows = [];
  columns = [];
  msgAlert = '';
  edit = true;
  selected = [];
  page = {
    limit: 15,
    count: 10,
    offset: 0,
  };

  listApps() {
    // tslint:disable-next-line: deprecation
    this.appService.listPoints().subscribe((data) => {
      if (data.Result === 'Success') {
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(data));
        this.rows = data.listCinemaApp;
        this.page.count = Number(data.totalBeacon);
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }

  deleteApps() {
    if (!sessionStorage.appId) {
      this.msgAlert = 'Please select a row';
      this.showToast('top-right', 'danger');
      return;
    }
    // tslint:disable-next-line: deprecation
    this.appService.deleteCinemaApp().subscribe((data) => {
      if (data.Result === 'Success') {
        // tslint:disable-next-line: no-console
        this.msgAlert = 'Cinema app successfully deleted';
        this.showToast('top-right', 'success');
        this.listApps();
        this.selected = [];
      } else {
        this.selected = [];
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }
  onSelect(event) {
    if (event.selected.length === 1) {
      this.edit = false;
    } else {
      this.edit = true;
    }
    try {
      // tslint:disable-next-line: no-console
      sessionStorage.appId = event.selected[0].appId;
    } catch (err) {
      sessionStorage.appId = '';
    }
  }
  showToast(position, status) {
    this.toastrService.show(this.msgAlert, 'Message', { position, status });
  }

  setPage(pageInfo) {
    this.page.offset = pageInfo.offset;
    this.appService.pageNo = pageInfo.offset;
    // tslint:disable-next-line: deprecation
    this.appService.listPoints().subscribe((data) => {
      if (data.Result === 'Success') {
        this.rows = data.lstbeacon;
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }
  onSaveAppId(appId) {
    sessionStorage.appId = appId;
    // tslint:disable-next-line:no-console
    console.log(appId);
  }
}
