import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CompanyService } from 'app/services/company/company.service';
import { adminMenu } from '../../admin-menu';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { CinemaAppsService } from 'app/services/beacon-points/beacon-points.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'apps-add',
  templateUrl: './apps-add.component.html',
  styleUrls: ['./apps-add.component.scss'],
})
export class AppsAddComponent implements OnInit {
  category = [];
  loading = false;
  showcategory = false;
  msgAlert = '';
  showimg = '';
  lstCompany:  [];
  Apps = {
    name: '',
    details: '',
    theamColor: '',
    logo: '',
    textColor: '',
    headerColor: '',
    buttonColor: '',
    companyId: '',
  };

  constructor(private appService: CinemaAppsService, private toastrService: NbToastrService,
    private companyService: CompanyService, private route: Router) { }

  ngOnInit(): void {
    this.listCompany();
  }

  items = adminMenu;
  Arr = Array;
  num: number = 100;


   imageSrc: string = '';
  handleInputChange(e) {
    // this.showimg=e.dataTransfer.files[0]
    // tslint:disable-next-line:prefer-const

    // if (e.target.files && e.target.files[0]) {
    //   const reader1 = new FileReader();
    //   reader1.onload = (e: any) => {
    //     this.imageSrc = e.target.result;
    //   };
    // var img = document.getElementById('imageid');
    // or however you get a handle to the IMG
    // var width = img.clientWidth;
    // var height = img.clientHeight;

    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
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
    // this.slide.sliderImage = arr[1];
    this.Apps.logo = arr[1];

  }


  addCinemaApp() {

    if (this.Apps.name === '' || this.Apps.name === null) {
      this.msgAlert = 'App Name can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.Apps.logo === '' || this.Apps.logo === null) {
      this.msgAlert = 'Address can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.Apps.theamColor === '' || this.Apps.theamColor === null) {
      this.msgAlert = 'Theam Color can\'t be empty';
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
    this.appService.addCinemaApps(this.Apps).subscribe(data => {
      if (data.Result === 'Success') {
        this.msgAlert = 'Cinema App Successfully Added';
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


  toogleCate() {
    this.showcategory = !this.showcategory;
  }

  showToast(position, status) {
    this.toastrService.show(
      this.msgAlert, 'Message',
      { position, status, limit: 2 });
  }
}
