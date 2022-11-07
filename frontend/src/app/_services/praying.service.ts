import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prying } from '../_models/prying';

const CONT_TYPE : string = 'application/json';
const API_URL : string = "https://api.collectapi.com";
const API_KEY : string = 'apikey 0pE8DpACgvNZUmtU6EKMCK:2hS2nvfgNNlplWwm4qNEzG';
@Injectable({
  providedIn: 'root'
})
export class PrayingService {

  constructor(private http: HttpClient) { }

  getPrayingList(){
    const headers = new HttpHeaders();
    headers.append('content-type', CONT_TYPE);
    headers.append('authorization', API_KEY);

    const requestOptions = { headers: headers };
    return this.http.get<any>(API_URL+"/pray/all?data.city=istanbul", requestOptions )
  }
}
