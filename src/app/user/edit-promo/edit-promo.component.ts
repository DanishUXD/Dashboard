import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { CinemaAppsService } from 'app/services/beacon-points/beacon-points.service';
import { EditPromoService } from 'app/services/editPromo/edit-promo.service';
import { UserLoginService } from 'app/services/userApi/user-login.service';
import { join } from 'path';
import { userMenu } from '../user-menu';
import { Lightbox } from 'ngx-lightbox';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['./edit-promo.component.scss'],
})
export class EditPromoComponent implements OnInit {
  mallPoint;
  beaconId;
  listPromoImg;
  selectImgType;
  urlimage = [];
  msgAlert = '';
  loading = false;
  loadavatar = false;
  constructor(private beaconPointsService: CinemaAppsService, private userLoginService: UserLoginService
    // tslint:disable-next-line: no-shadowed-variable
    , private EditPromoService: EditPromoService, private toastrService: NbToastrService, private _lightbox: Lightbox) {
  }
  tpoints;
  num: number = 5;
  beaconName = '';

  dropPointList = [];
  assign(data) {
    // this.num = Number(6);
    this.num = Number(data) + 1;

  }
  userDetail: {
    userId: String;
    userName: String;
    totalPoint: String;
  };
  private _album = [];

  statusUser = '';
  urlList = new Array(3);
  avatar = '';
  ngOnInit(): void {
    this.avatar = sessionStorage.avatar;

    this.statusUser = sessionStorage.status;
    this.tpoints = sessionStorage.totalPoints;
    this.userDetail = JSON.parse(sessionStorage.userData);
    this.assign(this.userDetail.totalPoint);
    this.getdrop();
    this.loadProfile();



  }

  items = userMenu;
  counter(i: number) {
    return new Array(i);
  }

  select = 1;
  Arr = Array;

  img_count: number = 3;
  imageSrc: string = '';
  url_count: any = 1;
  numb22: number = 0;


  imagetype() {
    if (Number(this.select) === 0) {
      this.select = 0;
    } else {
      this.select = 1;
    }
  }

  loadProfile() {

    if (this.avatar === 'null') {
      this.loadavatar = false;
      return;
    } else {
      this.loadavatar = true;
      return;
    }

  }
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
  displayImage: any = '';
  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    // tslint:disable-next-line:prefer-const
    let arr = this.imageSrc.split(',');
    // tslint:disable-next-line: no-console
    // this.slide.sliderImage = arr[1];
    this.postPromo(arr[1]);

  }
  add_input() {
    if (this.url_count <= 2) {
      this.url_count = this.url_count + 1;
      this.numb22 = this.numb22 + 1;
    }

  }
  onShow(event) {
    this.postPromo(event.target.value);

  }


  postPromo(image) {
    // tslint:disable-next-line: prefer-const
    if (!this.beaconId) {
      this.msgAlert = 'Select a Point';
      this.showToast('top-right', 'danger');
      return;
    }
    this.loading = true;
    const send = {
      beaconId: this.beaconId,
      promoImage: image,
      imageType: this.select,
    };
    // tslint:disable-next-line: deprecation
    this.userLoginService.promoImage(send).subscribe(data => {
      if (data.Result === 'Success') {
        // tslint:disable-next-line: no-console
        this.loading = false;
        this.msgAlert = 'Adv Banner Saved';
        this.showToast('top-right', 'success');
        this.getImageList();

      } else {
        this.loading = false;
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }



  deletePromo(deleteid) {
    // tslint:disable-next-line: prefer-const
    let send = {
      imageId: deleteid,
    };
    // tslint:disable-next-line: deprecation
    this.loading = true;
    // tslint:disable-next-line: deprecation
    this.userLoginService.promoDelete(send).subscribe(data => {
      if (data.Result === 'Success') {
        // tslint:disable-next-line: no-console
        this.msgAlert = 'Adv Banner Deleted';
        this.showToast('top-right', 'success');
        this.getImageList();
        this.loading = false;
      } else {
        this.loading = false;
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }

  getImageList() {
    const send = {
      userId: this.userDetail.userId,
      pointNumber: this.mallPoint,
    };
    // tslint:disable-next-line: deprecation
    this.EditPromoService.getList(send).subscribe(data => {
      // tslint:disable-next-line: no-console

      this.beaconName = data.beaconDetails.pointName;
      this.beaconId = data.beaconDetails.beaconId;
      this.listPromoImg = data.beaconDetails.lstPoinImages;
      data.beaconDetails.lstPoinImages.array.forEach(element => {
        this.urlimage.push(element.url);

      });

    });
  }

  getdrop() {
    const send = {
      userId: this.userDetail.userId,

    };
    // tslint:disable-next-line: deprecation
    this.EditPromoService.getdropPoint(send).subscribe(data => {
      if (data.Result === 'Success') {
        this.dropPointList = data.lstPoints;
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
