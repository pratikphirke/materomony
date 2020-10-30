import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class DefineProvider {
  rondomToken = '9Hc[H5b!aww,P9Dl+bi(yB';
  constructor(public http: HttpClient) {
   // console.log('Hello DefineProvider Provider');
  }
  public getRnadomToken() {
    return this.rondomToken;
  }
}
