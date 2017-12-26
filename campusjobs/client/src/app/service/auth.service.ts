import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken : any;
  user : any
  constructor(private http : Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/register',user, {headers : headers})
    .map(res => res.json());
  }

  authenticateUser(user){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:4000/users/authenticate',user, {headers : headers})
      .map(res => res.json());
  }

  getProfile(){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',this.authToken);
      return this.http.get('http://localhost:4000/users/profile',{headers : headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

    getFeeds(){
      console.log(this.authToken)
      this.getUserData();
      this.loadToken();
      let data = { userid : this.user.userId };
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',this.authToken);
      return this.http.post('http://localhost:4000/feed/newfeeds',data,{headers : headers})
      .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  getUserData(){
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("Parsed Json" , this.user);
    return this.user;
  }

  loggedIn(){
    console.log(tokenNotExpired());
    return tokenNotExpired();
  }

  logout(){
    this.authToken = null; 
    this.user = null;
    localStorage.clear();
  }
}