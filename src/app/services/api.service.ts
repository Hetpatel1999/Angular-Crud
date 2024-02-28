import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  postProduct(data: any){

    return this.http.post<any>("http://localhost:3000/userList/",data, this.httpOptions);
  }

  getProduct(){
    return this.http.get<any>("http://localhost:3000/userList/");
  }

  putProduct(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/userList/"+id,data, this.httpOptions);
  }

  deleteProduct(id: number){
    return this.http.delete<any>("http://localhost:3000/userList/"+id);
  }

}
