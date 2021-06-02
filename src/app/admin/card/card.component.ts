import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { CardService } from 'app/services/card/card.service';
import { SliderService } from 'app/services/slider/slider.service';
import { adminMenu } from '../admin-menu';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor(private cardService: CardService, private toastrService: NbToastrService) { }
  public LOGO = require('../../../assets/images/noimage.jpg');
  msgAlert = '';
  loading = false;
  ngOnInit(): void {
    this.listCard();
  }
  items = adminMenu;

  Cards = {
    companyId: '',
    expiryDate: '2021-06-04',
    offerDetail: 'new UI',
    imageUrl: '',
    };

  Arr = Array;
  num: number = 8;
  slideimage = [];
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
    this.Cards.imageUrl = arr[1];
    this.addCard();
  }

  addCard() {
    // tslint:disable-next-line: deprecation
    this.loading = true;
    // tslint:disable-next-line: deprecation
    this.cardService.addCard(this.Cards).subscribe(
      data => {
        if (data.Result === 'Success') {
          // tslint:disable-next-line: no-console
          this.msgAlert = 'Successfully Added Image';
          this.showToast('top-right', 'success');
          this.loading = false;
          this.listCard();
        } else {
          this.loading = false;
          this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
        }
      },
    );
  }
  listCard() {
    // tslint:disable-next-line: deprecation
    this.cardService.getCardById(sessionStorage.appId).subscribe(data => {
      if (data.Result === 'Success') {
        this.slideimage = data.List_slider;
        // tslint:disable-next-line: no-console

      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }

  deleteSlide(fetch) {
    // tslint:disable-next-line: deprecation
    // tslint:disable-next-line: deprecation
    this.loading = true;

    // tslint:disable-next-line: deprecation
    this.cardService.deleteCard().subscribe(data => {
      if (data.Result === 'Success') {
        this.loading = false;

        // tslint:disable-next-line: no-console
        this.msgAlert = 'Successfully Deleted Image';
        this.showToast('top-right', 'success');
        this.listCard();
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
      { position, status , limit: 2});
  }
}
