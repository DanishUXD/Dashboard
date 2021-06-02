import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'app/services/company/company.service';
import { NbToastrService } from '@nebular/theme';
import { adminMenu } from '../../admin-menu';
import { CardService } from 'app/services/card/card.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.scss'],
})
export class OfferEditComponent implements OnInit {
  category = [];
  lstCompany = [];
  loading = false;
  showcategory = false;
  msgAlert = '';
  showimg = '';
  Cards = {
    companyId: '',
    cardId: sessionStorage.cardId,
    expiryDate: '',
    offerDetail: '',
    imageUrl: '',
    };

  data = {
    cardId: sessionStorage.cardId,
  };
  constructor(private cardService: CardService, private toastrService: NbToastrService, private route: Router,
    private companyService: CompanyService) { }

  ngOnInit(): void {
  this.getCardById();
  this.listCompany();
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
    this.Cards.imageUrl = arr[1];
  }

  updateCard() {

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
    this.cardService.updateCard(this.Cards).subscribe(data => {
      if (data.Result === 'Success') {
        this.msgAlert = 'Cinema App Successfully Updated';
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

  getCardById() {
    // tslint:disable-next-line: deprecation
    this.cardService.getCardById(this.data).subscribe(data => {
      if (data.Result === 'Success') {
        this.Cards.offerDetail = data.cardDetails.offerDetail;
        this.Cards.expiryDate = data.cardDetails.expiryDate;
        this.Cards.companyId = data.cardDetails.companyId;
        this.imageSrc = data.cardDetails.imageUrl;
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
