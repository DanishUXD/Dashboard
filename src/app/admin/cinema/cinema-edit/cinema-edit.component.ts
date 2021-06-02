import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CompanyService } from 'app/services/company/company.service';
import { adminMenu } from '../../admin-menu';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cinema-edit',
  templateUrl: './cinema-edit.component.html',
  styleUrls: ['./cinema-edit.component.scss'],
})
export class CinemaEditComponent implements OnInit {
  showimg = '';
  msgAlert = '';
  category = [];
  showcategory = false;
  loading = false;
  categoryadd = {
    name: '',
  };
  company = {

    cinemaName      : '',
    address          : '',
    mobileNo         : '',
    email            : '',
    userId: '223830399608806440138183681776',
   companyId: sessionStorage.companyId,
    // companyId: '29469833280464112805468867458559323',
    logoImage         : '',

    };
    stateList = [];

  constructor(private companyService: CompanyService, private toastrService: NbToastrService, private route: Router) { }

  ngOnInit(): void {
    this.getById();
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
    // this.slide.sliderImage = arr[1];
    this.company.logoImage = arr[1];


  }

  getById() {
    // tslint:disable-next-line: deprecation
    this.companyService.getCompanyById().subscribe(data => {
      if (data.Result === 'Success') {
        this.company.cinemaName = data.CompanyDetails.cinemaName;
        this.company.address = data.CompanyDetails.address;
        this.company.mobileNo = data.CompanyDetails.mobileNo;
        this.company.email = data.CompanyDetails.email;
        this.imageSrc = data.CompanyDetails.logoImage;


      } else {
        this.msgAlert = data.Msg;
      this.showToast('top-right', 'danger');
      }
    });
  }
  getState() {
    // tslint:disable-next-line: deprecation
    this.companyService.getStateList().subscribe(data => {
      if (data.Result === 'Success') {
        this.stateList = data.GetStateList;

      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');

      }
    });
  }
updateCompany() {
  if (this.company.cinemaName === '' || this.company.cinemaName === null) {
    this.msgAlert = 'cinemaName Name can\'t be empty';
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
  this.companyService.updateCompany(this.company).subscribe(data => {
    if (data.Result === 'Success') {
      this.msgAlert = 'Successfully Updated Company';
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
addCategory() {
  if (this.categoryadd.name === '' || this.categoryadd.name === null) {
    this.msgAlert = 'Category name can\'t be empty';
    this.showToast('top-right', 'danger');
    return;
  }
  // tslint:disable-next-line: deprecation
  this.loading = true;
  // tslint:disable-next-line: deprecation
  this.companyService.addCategory(this.categoryadd).subscribe(data => {
    if (data.Result === 'Success') {
      this.loading = false;
      this.categoryadd.name = '';
      this.listCategory();
    } else {
      this.loading = false;
      this.msgAlert = data.Msg;
      this.showToast('top-right', 'danger');
    }
  });
}

listCategory() {
  // tslint:disable-next-line: deprecation
  this.companyService.listCategory().subscribe(data => {
    if (data.Result === 'Success') {
      this.category = data.categoryList;
    } else {
      this.msgAlert = data.Msg;
      this.showToast('top-right', 'danger');
    }
  });
}

categoryDeleteApi(id) {
const  send = {
  categoryId: id,
};
this.loading = true;
  // tslint:disable-next-line: deprecation
  this.companyService.deleteCategory(send).subscribe(data => {
    if (data.Result === 'Success')  {
      this.loading = false;
      this.listCategory();
    } else {
      this.loading = false;
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
