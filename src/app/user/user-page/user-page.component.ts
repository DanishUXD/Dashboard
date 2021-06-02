import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserService } from 'app/services/admin/user.service';
import { UserLoginService } from 'app/services/userApi/user-login.service';
import { userMenu } from '../user-menu';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  userDetail: any = '';
  msgAlert = '';
  showEdit = false;
  user = {
    userId: sessionStorage.userId,
    userName: '',
    email: '',
    beaconsPoint: '',
    address: '',
    mobileNo: '',
    companyName: '',
  };
  statusUser = '';
  avatar = '';
  loadavatar = false;
  constructor(
    private userService: UserService,
    private userLoginService: UserLoginService,
    private toastrService: NbToastrService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.avatar = sessionStorage.avatar;

    this.getUser();
    this.statusUser = sessionStorage.status;
    this.userDetail = JSON.parse(sessionStorage.userData);
    this.loadProfile();
  }
  items = userMenu;
  loadProfile() {
    if (this.avatar === 'null') {
      this.loadavatar = false;
      return;
    } else {
      this.loadavatar = true;
      return;
    }
  }
  userChange = {

    userId:  sessionStorage.userId,
    userName: '',


  };

  getUser() {
    // tslint:disable-next-line: deprecation
    this.userService.getByUserName().subscribe((data) => {
      if (data.Result === 'Success') {
        this.user.companyName = data.userDetails.companyName;
        this.user.email = data.userDetails.emailId;
        this.user.beaconsPoint = data.userDetails.totalPoint;
        this.user.mobileNo = data.userDetails.mobileNo;
        this.user.address = data.userDetails.address;
        this.user.userName = data.userDetails.userName;
        this.userChange.userName = data.userDetails.userName;
        // sessionStorage.avatar = data.userDetails.avatar;
        // this.avatar = data.userDetails.avatar;
      }
    });
  }
  uploadProf = {
    userId: sessionStorage.userId,
    profile: '',
  };

  private imageSrc: string = '';
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
    this.uploadProf.profile = arr[1];
    this.uploadPic();
  }

  uploadPic() {
    // tslint:disable-next-line: deprecation
    // tslint:disable-next-line: deprecation
    this.userLoginService.profileImage(this.uploadProf).subscribe((data) => {
      if (data.Result === 'Success') {
        this.msgAlert = 'Successfully Added Profile Image';
        this.showToast('top-right', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }

  getAvatar() {
    // tslint:disable-next-line: deprecation
    this.userLoginService.getAvatar().subscribe((data) => {
      if (data.Result === 'Success') {
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }

  changeEdit() {
    this.showEdit = !this.showEdit;
  }
  updateUser() {
    // tslint:disable-next-line: deprecation
    this.userService.updateuser(this.userChange).subscribe(data => {
      // tslint:disable-next-line: no-console
      if (data.Result === 'Success') {
        this.msgAlert = 'Successfully Updated User';
        this.showToast('top-right', 'success');
        sessionStorage.userName = this.userChange.userName;
        this.getUser();
        this.showEdit = false;

      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    },

    );
  }
  showToast(position, status) {
    this.toastrService.show(this.msgAlert, 'Message', {
      position,
      status,
      limit: 2,
    });
  }
}
