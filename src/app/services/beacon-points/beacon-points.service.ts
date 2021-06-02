import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalBaseurl } from 'app/config/baseUrl';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CinemaAppsService {
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

  listPoints() {
    const params = {
      page: Number(this.pageNo) + 1,
      recordPerPage: 15,
    };
    return this.http
      .post<any>(this.baseApiUrl + 'app/listcinemaapp', params, this.header)
      .pipe(catchError(this.handleError));
  }

  addCinemaApps(data) {
    return this.http
      .post<any>(this.baseApiUrl + 'app/addcinemaapp', data, this.header)
      .pipe(catchError(this.handleError));
  }

  cinemaAppById(data) {
    return this.http
      .post<any>(
        this.baseApiUrl + 'app/getcinemaappdetailsbyid',
        data,
        this.header,
      )
      .pipe(catchError(this.handleError));
  }
  updateCinemaApp(data) {
    return this.http
      .post<any>(this.baseApiUrl + 'app/updatecinemaapp', data, this.header)
      .pipe(catchError(this.handleError));
  }
  deleteCinemaApp() {
    const params = {
      appId : sessionStorage.appId,
    };
    return this.http
      .post<any>(this.baseApiUrl + 'app/deletecinemaapp', params, this.header)
      .pipe(catchError(this.handleError));
  }
  getApps(id) {
    const parmas = {
      userId: id,
    };
    return this.http
      .post<any>(
        this.baseApiUrl + 'beacon/getuserbeacondetails',
        parmas,
        this.header,
      )
      .pipe(catchError(this.handleError));
  }

  searchName(data) {
    return this.http
      .post<any>(this.baseApiUrl + 'user/searchuser', data, this.header)
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
