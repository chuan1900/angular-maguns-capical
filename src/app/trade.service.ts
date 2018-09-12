import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { Trade } from './trades';
import 'rxjs/add/operator/map';



@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
        return this.http.get('//localhost:8147/dashboard/home');
    }

  getAllTrades(): Observable<any> {
    return this.http.get('//localhost:8147/trades');
  }

  getPosts(): Observable<Trade[]> {
    return this.http
        .get('//localhost:8147/trades')
        .map((response: Response) => {
            return <Trade[]>response.json();
        });
}

  runTwoMA(): Observable<any> {
      // var body = "firstname=" + user.firstname + "&lastname=" + user.lastname + "&name=" + user
      console.log('In runTwoMA service');
      return this.http.post('//localhost:8147/runTwoMA', '');

  }

  // runTwoMA(): Observable<any> {
  //   // var body = "firstname=" + user.firstname + "&lastname=" + user.lastname + "&name=" + use
  //   console.log('In runTwoMA service');
  //   console.log('params.toString: ' + this.params.toString());
  //   return this.http.get('//localhost:8147/runTwoMA?param=params');

  // }

  runBB(body): Observable<any> {
    return this.http.post('//localhost:8147/runBB', body);
  }

  // runBB(): Observable<any> {
  //     return this.http.get('//localhost:8147/runBB?param=params');
  // }

    // private handleError(error: Response | any) {
    //     let errorMsg: string;
    //     console.error(errorMsg);
    //     return Promise.reject(errorMsg);
    // }
}

