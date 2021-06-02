import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CompanyService } from 'app/services/company/company.service';
import { adminMenu } from '../../admin-menu';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { CinemaAppsService } from 'app/services/beacon-points/beacon-points.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'apps-edit',
  templateUrl: './apps-edit.component.html',
  styleUrls: ['./apps-edit.component.scss'],
})
export class AppsEditComponent implements OnInit {
  category = [];
  lstCompany = [];
  loading = false;
  showcategory = false;
  msgAlert = '';
  showimg = '';

  Apps = {
    appId: sessionStorage.appId,
    name: '',
    details: '',
    theamColor: '',
    headerColor: '',
    textColor: '',
    buttonColor: '',
    logo: '',
    companyId: '',
  };

  data = {
    appId: sessionStorage.appId,
  };
  constructor(private appService: CinemaAppsService, private toastrService: NbToastrService,
    private route: Router, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.listCompany();
    this.getAppById();
  }

  items = adminMenu;
  Arr = Array;
  num: number = 100;

   imageSrc: string = '';
   handleInputChange(e) {
    // tslint:disable-next-line:prefer-const
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    // tslint:disable-next-line:prefer-const
    let arr = this.imageSrc.split(',');
    // tslint:disable-next-line: no-console
    this.Apps.logo = arr[1];
  }

  updateCinemaApp() {

    if (this.Apps.name === '' || this.Apps.name === null) {
      this.msgAlert = 'App Name can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.Apps.theamColor === '' || this.Apps.theamColor === null) {
      this.msgAlert = 'Color can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.Apps.details === '' || this.Apps.details === null) {
      this.msgAlert = 'Details can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    this.loading = true;
    // tslint:disable-next-line: deprecation
    this.appService.updateCinemaApp(this.Apps).subscribe(data => {
      if (data.Result === 'Success') {
        this.msgAlert = 'Cinema App Successfully Updated';
        this.showToast('top-right', 'success');
        this.loading = false;
        setTimeout(() => {
          this.route.navigateByUrl('/admin/cinema-apps');
        }, 2000);

      } else {
        this.loading = false;

        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }

  listCompany() {
    // tslint:disable-next-line: deprecation
    this.companyService.listCompany().subscribe(data => {
      if (data.Result === 'Success') {
        this.lstCompany = data.lstCompany;

      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }

    });
  }

  getAppById() {
    // tslint:disable-next-line: deprecation
    this.appService.cinemaAppById(this.data).subscribe(data => {
      if (data.Result === 'Success') {
        this.Apps.name = data.CinemaAppModel.name;
        this.Apps.details = data.CinemaAppModel.details;
        this.Apps.theamColor = data.CinemaAppModel.theamColor;
        this.Apps.headerColor = data.CinemaAppModel.headerColor;
        this.Apps.textColor = data.CinemaAppModel.textColor;
        this.Apps.companyId = data.CinemaAppModel.companyId;
        this.imageSrc = data.CinemaAppModel.logo;
      } else {
        this.msgAlert = data.Msg;
      this.showToast('top-right', 'danger');
      }
    });
  }
  toogleCate() {
    this.showcategory = !this.showcategory;
  }

  showToast(position, status) {
    this.toastrService.show(
      this.msgAlert, 'Message',
      { position, status, limit: 2 });
  }
}
