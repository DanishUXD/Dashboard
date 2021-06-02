import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalBaseurl } from 'app/config/baseUrl';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BaseApiurl = GlobalBaseurl.BASE_API_URL;
  constructor(private http: HttpClient) { }
  pageNo = 0;
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'responseType': 'json',
      'Authorization': 'zROnP44uHEFkaRtoi7',
    }),
  };
  userList() {
    // tslint:disable-next-line: no-console
    const params = {

      page: Number( this.pageNo) + 1,
      recordPerPage: 100,
    };

    return this.http.get<any>(this.BaseApiurl + 'user/listusers', this.header)
      .pipe(
        catchError(this.handleError),
      );
  }

  userListByCinema(data) {
    // tslint:disable-next-line: no-console
    const params = {

      page: Number( this.pageNo) + 1,
      recordPerPage: 100,
    };

    return this.http.post<any>(this.BaseApiurl + 'user/getusersbycinema', data, this.header)
    .pipe(
      catchError(this.handleError),
    );
  }

  getByUserName() {
    const param = {
      userName: sessionStorage.userName,
    };
    return this.http.post<any>(this.BaseApiurl + 'user/getuserdetailsbyusername' , param, this.header)
    .pipe(
      catchError(this.handleError),
    );
  }

  updateuser(data) {
    return this.http.post<any>(this.BaseApiurl + 'user/updateuser', data, this.header)
    .pipe(
      catchError(this.handleError),
    );
  }
  deleteUser() {
    const param = {
      userName: sessionStorage.userName,
    };
    return this.http.post<any>(this.BaseApiurl + 'user/deleteusers', param, this.header)
    .pipe(
      catchError(this.handleError),
    );
  }

  userStatus(data) {
    return this.http.post<any>(this.BaseApiurl + 'user/activestatus', data, this.header)
    .pipe(
      catchError(this.handleError),
    );
  }

  mobileList(data) {
  const  page = {
      page         : Number(data) + 1,
      recordPerPage : 15,
    };
    return this.http.post<any>(this.BaseApiurl + 'app/applistusers', page  , this.header)
    .pipe(
      catchError(this.handleError),
    );
  }

  changePass(data) {
    return this.http.post<any>(this.BaseApiurl + 'user/adminpasswordupdate', data, this.header)
    .pipe(
      catchError(this.handleError),
    );
  }
  changeUsername(data) {
    return this.http.post<any>(this.BaseApiurl + '', data, this.header)
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
