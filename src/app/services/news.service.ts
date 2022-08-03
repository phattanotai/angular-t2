import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  token: string = '';
  constructor(private http: HttpClient) {}

  setHeader() {
    this.token = JSON.parse(localStorage.getItem('accessToken') || '{}');
    let Headers = new HttpHeaders();
    Headers = Headers.set('Content-Type', 'application/json; charset=UTF-8');
    if (typeof this.token === 'string') {
      Headers = Headers.set('Authorization', this.token);
    }
    let Params = new HttpParams();
    const options = { headers: Headers, params: Params };
    return options;
  }
  getNews(EmployeeId: number) {
    const options = this.setHeader();
    options.params = options.params.set('EmployeeId', EmployeeId);

    return this.http
      .get(`${environment.apiUrl}/ED-GetNews`, options)
      .pipe(map((res: any) => res));
  }

  updateNewsStatus(data: any, EmployeeId: number) {
    const options = this.setHeader();
    options.headers = options.headers.delete(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    const body = new FormData();
    body.append('EmployeeId', EmployeeId.toString());
    body.append('NewsId', data.NewsId);
    body.append('Status', data.Status);

    return this.http
      .post(
        `http://dev-sw6-uapi.ecm.in.th/uapi/drt-ElectronicsDocument/ED-UpdateStatusNews`,
        body,
        options
      )
      .pipe(map((res: any) => res));
  }
}
