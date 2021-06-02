import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { CompanyService } from 'app/services/company/company.service';
import { adminMenu } from '../../admin-menu';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cinema-list',
  templateUrl: './cinema-list.component.html',
  styleUrls: ['./cinema-list.component.scss'],
})
export class CinemaListComponent implements OnInit {

  constructor(private companyService: CompanyService, private toastrService: NbToastrService) { }
  edit = true;
  selected = [];
  msgAlert = '';
  page = {
    limit: 15,
    count: 0,
    offset: 0,

  };
  ngOnInit(): void {
    this.listCompany();
    sessionStorage.removeItem('companyId');

  }
  items = adminMenu;

  rows = [];
  columns = [];

  listCompany() {
    // tslint:disable-next-line: deprecation
    this.companyService.listCompany().subscribe(data => {
      if (data.Result === 'Success') {
        this.page.count = data.CountCompany;
        this.rows = data.lstCompany;

      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }

    });
  }
  delete() {
    if (!sessionStorage.companyId) {
      this.msgAlert = 'Select a company!';
      this.showToast('top-right', 'danger');
      return;
    }
    if (sessionStorage.companyId === '' || sessionStorage.companyId === null) {
      this.msgAlert = 'Select a company';
      this.showToast('top-right', 'danger');
      return;
    }
    // tslint:disable-next-line: deprecation
    this.companyService.deleteCompany().subscribe(data => {
      if (data.Result === 'Success') {
        this.listCompany();
        this.selected = [];
        this.msgAlert = 'Successfully Deleted Company';
        this.showToast('top-right', 'success');
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
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
      sessionStorage.companyId = event.selected[0].companyId;
    } catch (err) {
      sessionStorage.companyId = '';
      this.edit = true;
    }

  }
  showToast(position, status) {
    this.toastrService.show(
      this.msgAlert, 'Message',
      { position, status, limit: 2 });
  }
  setPage(pageInfo) {
    this.page.offset = pageInfo.offset;
    this.companyService.pageNo = pageInfo.offset;
    // tslint:disable-next-line: deprecation
    this.companyService.listCompany().subscribe(data => {
      if (data.Result === 'Success') {
        // tslint:disable-next-line: no-console
        this.rows = data.lstCompany;
        this.page.count = data.CountCompany;
      }
    });
  }
}
