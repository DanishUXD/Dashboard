import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { CardService } from 'app/services/card/card.service';
import { adminMenu } from '../../admin-menu';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent implements OnInit {
  constructor(
    private cardService: CardService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.listCards();
    sessionStorage.removeItem('appId');
    this.selected = [];
  }

  items = adminMenu;
  rows = [];
  columns = [];
  msgAlert = '';
  edit = true;
  selected = [];
  page = {
    limit: 15,
    count: 10,
    offset: 0,
  };

  listCards() {
    // tslint:disable-next-line: deprecation
    this.cardService.listCard().subscribe((data) => {
      if (data.Result === 'Success') {
        // tslint:disable-next-line:no-console
        this.rows = data.cardList;
        this.page.count = Number(data.totalCards);
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }

  deleteCard() {
    if (!sessionStorage.cardId) {
      this.msgAlert = 'Please select a row';
      this.showToast('top-right', 'danger');
      return;
    }
    // tslint:disable-next-line: deprecation
    this.cardService.deleteCard().subscribe((data) => {
      if (data.Result === 'Success') {
        // tslint:disable-next-line: no-console
        this.msgAlert = 'Successfully Added User';
        this.showToast('top-right', 'success');
        this.listCards();
        this.selected = [];
      } else {
        this.selected = [];
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }
  onSelect(event) {
    if (event.selected.length === 1) {
      this.edit = false;
    } else {
      this.edit = true;
    }
    try {
      // tslint:disable-next-line: no-console
      sessionStorage.cardId = event.selected[0].cardId;
    } catch (err) {
      sessionStorage.cardId = '';
    }
  }
  showToast(position, status) {
    this.toastrService.show(this.msgAlert, 'Message', { position, status });
  }

  setPage(pageInfo) {
    this.page.offset = pageInfo.offset;
    this.cardService.pageNo = pageInfo.offset;
    // tslint:disable-next-line: deprecation
    this.cardService.listCard().subscribe((data) => {
      if (data.Result === 'Success') {
        this.rows = data.cardList;
      } else {
        this.msgAlert = data.Msg;
        this.showToast('top-right', 'danger');
      }
    });
  }
  onSaveAppId(cardId) {
    sessionStorage.cardId = cardId;
    // tslint:disable-next-line:no-console
    console.log(cardId);
  }
}
