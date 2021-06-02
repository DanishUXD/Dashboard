import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { MainbannerService } from 'app/services/mainbanner/mainbanner.service';
import { adminMenu } from '../admin-menu';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'main-image',
  templateUrl: './main-image.component.html',
  styleUrls: ['./main-image.component.scss'],
})
export class MainImageComponent implements OnInit {

  constructor(private mainbannerService: MainbannerService, private toastrService: NbToastrService) { }
bannerimg ;
bannerid;
msgAlert = '';
  ngOnInit(): void {
    this.showimage();
  }
  items = adminMenu;
  loading = false;
  private imageSrc: string = '';
  handleInputChange(e) {
    if (this.bannerimg) {
      this.msgAlert = 'Delete Image Before Upload';
      this.showToast('top-right', 'danger');
      return;
    }
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
    this.uploadImage(arr[1]);

  }
uploadImage(img) {
  this.loading = true;
  const send = {
    appId: sessionStorage.appId,
    bannerImage: img,
  };

  // tslint:disable-next-line: deprecation
  this.mainbannerService.uploadBanner(send).subscribe(data => {
    if (data.Result === 'Success') {
      this.showimage();
      this.loading = false;
      this.msgAlert = 'Successfully banner Image';
      this.showToast('top-right', 'success');
    } else {
      this.msgAlert = data.Msg;
      this.showToast('top-right', 'danger');
      this.loading = false;
    }
  });
}

showimage() {
  // tslint:disable-next-line: deprecation
  this.mainbannerService.showImage().subscribe(data => {
    if (data.Result === 'Success') {
       this.bannerimg = data.BannerImage[0].bannerImage;
       this.bannerid = data.BannerImage[0].bannerId;
    } else {
      this.msgAlert = data.Msg;
      this.showToast('top-right', 'danger');
    }
  });
}

bannerdelete() {
  const bannerdelete = {
    bannerId: this.bannerid,
  };
  // tslint:disable-next-line: deprecation
  this.mainbannerService.deleteImage(bannerdelete).subscribe(data => {
    if (data.Result === 'Success') {
      this.bannerimg = '';
      this.showimage();
    } else {
      this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
    }
  });
}
showToast(position, status) {
  this.toastrService.show(
    this.msgAlert, 'Message',
    { position, status , limit: 2});
}
}
