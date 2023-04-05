/* import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Newsletter } from 'src/app/models/newsletter.model';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private httpOptions: any;
  private URL: string;

  constructor( private http: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Accept': '*//*',
      }),
      withCredentials: true
    };

    this.URL = "/api/newsletter";
   }

  getAll():Observable<any>{
    return this.http.get<Newsletter[]>(this.URL, this.httpOptions);
  }

  create(val: any):Observable<any>{
    return this.http.post<any>(this.URL, val, this.httpOptions);
  }

  update(val: any):Observable<any>{
    return this.http.put<any>(this.URL, val, this.httpOptions);
  }

  delete(id: any):Observable<any>{
    return this.http.delete<Newsletter>(this.URL + "/" + id, this.httpOptions);
  }
}
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Newsletter } from 'src/app/models/newsletter.model';

interface RequestOptions {
  headers: HttpHeaders;
  withCredentials: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private static readonly URL = '/api/newsletter';
  private static readonly OPTIONS: RequestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '',
      'Access-Control-Allow-Credentials': 'true',
      'Accept': '/*',
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(NewsletterService.URL, NewsletterService.OPTIONS);
  }

  create(val: any): Observable<any> {
    return this.http.post<any>(NewsletterService.URL, val, NewsletterService.OPTIONS);
  }

  update(val: any): Observable<any> {
    return this.http.put<any>(NewsletterService.URL, val, NewsletterService.OPTIONS);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(NewsletterService.URL + "/" + id, NewsletterService.OPTIONS);
  }

  get(id: any): Observable<any> {
    return this.http.get<Newsletter>(NewsletterService.URL + "/" + id, NewsletterService.OPTIONS);
  }
}