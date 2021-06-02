import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalBaseurl } from 'app/config/baseUrl';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseApiUrl = GlobalBaseurl.BASE_API_URL;
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

  listCompany() {
    const params = {
      page: this.pageNo + 1,
      recordPerPage: 15,
    };


    return this.http.post<any>(this.baseApiUrl + 'company/listcompany', params, this.header)
      .pipe(
        catchError(this.handleError),
      );
  }
  addCompany(data: any) {
    return this.http.post<any>(this.baseApiUrl + 'company/addcompany', data, this.header)
      .pipe(
        catchError(this.handleError),
      );
  }

  getCompanyById() {
    // const params = new HttpParams().set('userId', '847361343291188023527292817215')
    //                               .set('companyId', sessionStorage.companyId);
    const param = {
      userId: sessionStorage.userId,
      companyId: sessionStorage.companyId,
    };
    return this.http.post<any>(this.baseApiUrl + 'company/getcompanydetailsbyid', param, this.header)
      .pipe(
        catchError(this.handleError),
      );
  }
  updateCompany(data: any) {
    return this.http.post<any>(this.baseApiUrl + 'company/updatecompany', data, this.header)
      .pipe(
        catchError(this.handleError),
      );
  }
  deleteCompany() {
    const params = {
      companyId: sessionStorage.companyId,
    };
    return this.http.post<any>(this.baseApiUrl + 'company/deletecompany', params, this.header)
      .pipe(
        catchError(this.handleError),
      );
  }

  addCategory(data) {
    return this.http.post<any>(this.baseApiUrl + 'category/addcategory', data, this.header)
      .pipe(
        catchError(this.handleError),
      );
  }
  listCategory() {
  const  page = {
      page: 1,
      recordPerPage: 8,

    };
    return this.http.post<any>(this.baseApiUrl + 'category/listcategory', page, this.header)
      .pipe(
        catchError(this.handleError),
      );
  }

  deleteCategory(id) {

    return this.http.post<any>(this.baseApiUrl + 'category/deletecategory', id, this.header)
    .pipe(
      catchError(this.handleError),
    );
  }

  getStateList() {
    return this.http.get<any>(this.baseApiUrl + 'getstate/getstatelist', this.header)
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
