import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalBaseurl } from 'app/config/baseUrl';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private baseApiUrl = GlobalBaseurl.BASE_API_URL;
  constructor(private http: HttpClient) { }
  header = {
    headers: new HttpHeaders
      ({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'responseType': 'json',
        'Authorization': 'zROnP44uHEFkaRtoi7',
      }),
  };
  resgisterUser(data) {
    return this.http.post<any>(this.baseApiUrl + 'user/registeruser', data, this.header)
      .pipe(
        catchError(this.handleError),
      );
  }


  listCompany() {
    return this.http.get<any>(this.baseApiUrl + 'company/getcompany', this.header)
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