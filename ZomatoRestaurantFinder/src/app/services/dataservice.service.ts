import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http:HttpClient) { }

  private apiURL="https://developers.zomato.com/api/v2.1/search?entity_id=7&entity_type=city&q=test&start=1&count=100";

getData(paramVal):Observable<any>
{
  let url=this.apiURL+paramVal;
  const headers=new HttpHeaders({'Content-Type':'application/json','user-key':'f985d357708f9e0123d0ab364d60a499'});
  return this.http.get<any>(url,{headers:headers}) 
}
}
