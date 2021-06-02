import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'app/services/company/company.service';
import { NbToastrService } from '@nebular/theme';
import { CardService } from 'app/services/card/card.service';
import { adminMenu } from '../../admin-menu';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.scss'],
})
export class OfferAddComponent implements OnInit {
  lstCompany = [];
  category = [];
  loading = false;
  showcategory = false;
  msgAlert = '';
  showimg = '';
  Cards = {
    companyId: '',
    expiryDate: '',
    offerDetail: '',
    imageUrl: '',
    };

  constructor(private cardService: CardService, private toastrService: NbToastrService, private route: Router,
    private companyService: CompanyService) { }

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
    this.Cards.imageUrl = arr[1];

  }


  addCinemaApp() {

    if (this.Cards.offerDetail === '' || this.Cards.offerDetail === null) {
      this.msgAlert = 'offer details can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    if (this.Cards.expiryDate === '' || this.Cards.expiryDate === null) {
      this.msgAlert = 'expiry date can\'t be empty';
      this.showToast('top-right', 'danger');
      return;
    }
    this.loading = true;
    // tslint:disable-next-line: deprecation
    this.cardService.addCard(this.Cards).subscribe(data => {
      if (data.Result === 'Success') {
        this.msgAlert = 'Card banner Successfully Added';
        this.showToast('top-right', 'success');
        this.loading = false;
        setTimeout(() => {
          this.route.navigateByUrl('/admin/card');
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
