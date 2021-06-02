import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalBaseurl } from 'app/config/baseUrl';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private baseApiUrl = GlobalBaseurl.BASE_API_URL;
  constructor(private http: HttpClient) {}
  pageNo = 0;
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      responseType: 'json',
      Authorization: 'zROnP44uHEFkaRtoi7',
    }),
  };

  listCard() {
    return this.http
      .get<any>(this.baseApiUrl + 'card/cardlist',  this.header)
      .pipe(catchError(this.handleError));
  }

  addCard(data) {
    return this.http
      .post<any>(this.baseApiUrl + 'card/addcard', data, this.header)
      .pipe(catchError(this.handleError));
  }

  getCardById(data) {
    return this.http
      .post<any>(
        this.baseApiUrl + 'card/carddetails',
        data,
        this.header,
      )
      .pipe(catchError(this.handleError));
  }
  updateCard(data) {
    return this.http
      .post<any>(this.baseApiUrl + 'card/updatecard', data, this.header)
      .pipe(catchError(this.handleError));
  }
  deleteCard() {
    const params = {
      cardId : sessionStorage.cardId,
    };
    return this.http
      .post<any>(this.baseApiUrl + 'card/deletecard', params, this.header)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code ${error.status}, ' +
          'body was: ${error.error}' +
          error,
      );
    }
    return throwError(
      'Something bad happened; please try again later.' + JSON.stringify(error),
    );
  }
}
