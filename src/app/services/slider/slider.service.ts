import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalBaseurl } from 'app/config/baseUrl';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  private baseApiUrl = GlobalBaseurl.BASE_API_URL;
  constructor(private http: HttpClient) { }
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'responseType': 'json',
      'Authorization': 'zROnP44uHEFkaRtoi7',
    }),
  };

  addSlider(data) {
    return this.http.post<any>(this.baseApiUrl + 'slider/addslider', data, this.header)
      .pipe(
        catchError(this.handleError),
      );

  }
  listSlide() {
    const param = {
      appId : sessionStorage.appId,
    };
    return this.http.post<any>(this.baseApiUrl + 'slider/listslider', param, this.header)
      .pipe(
        catchError(this.handleError),
      );
  }
  delete(data) {
    const params = {
      sliderId: data,
    };
    return this.http.post<any>(this.baseApiUrl + 'slider/deleteslider', params, this.header)
      .pipe(
        catchError(this.handleError),
      );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error('Backend returned code ${error.status}, ' + 'body was: ${error.error}' + error);
    }
    return throwError('Something bad happened; please try again later.' + JSON.stringify(error));
  }

}
