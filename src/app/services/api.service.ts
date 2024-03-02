import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interface/order.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  postOrder(data: any){

    return this.http.post<any>("http://localhost:3000/orderList/",data, this.httpOptions);
  }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>("http://localhost:3000/orderList/");
  }

  putOrder(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/orderList/"+id,data, this.httpOptions);
  }

  deleteOrder(id: number){
    return this.http.delete<any>("http://localhost:3000/orderList/"+id);
  }

}
