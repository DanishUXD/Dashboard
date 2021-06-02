import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CompanyService } from 'app/services/company/company.service';
import { adminMenu } from '../../admin-menu';
import { Ng2ImgMaxModule } from 'ng2-img-max';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cinema-add',
  templateUrl: './cinema-add.component.html',
  styleUrls: ['./cinema-add.component.scss'],
})
export class CinemaAddComponent implements OnInit {
  category = [];
  loading = false;
  showcategory = false;
  msgAlert = '';
  showimg = '';
  company = {

    cinemaName: '',
    address: '',
    mobileNo: '',
    email: '',
    logoImage: '',

  };

  constructor(private companyService: CompanyService, private toastrService: NbToastrService, private route: Router) { }

  ngOnInit(): void {

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
    this.company.logoImage = arr[1];

  }


  addCompany() {

    if (this.company.cinemaName === '' || this.company.cinemaName === null) {
      this.msgAlert = 'Company Name can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.company.address === '' || this.company.address === null) {
      this.msgAlert = 'Address can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.company.mobileNo === '' || this.company.mobileNo === null) {
      this.msgAlert = 'Mobile No can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.company.email === '' || this.company.email === null) {
      this.msgAlert = 'Email can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    this.loading = true;
    // tslint:disable-next-line: deprecation
    this.companyService.addCompany(this.company).subscribe(data => {
      if (data.Result === 'Success') {
        this.msgAlert = 'Successfully Added Company';
        this.showToast('top-right', 'success');
        this.loading = false;
        setTimeout(() => {
          this.route.navigateByUrl('/admin/cinema');
        }, 2000);

      } else {
        this.loading = false;

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
