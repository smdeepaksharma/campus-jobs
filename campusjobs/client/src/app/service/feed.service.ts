import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedService {

  constructor(private http : Http) { }

  getFeeds(userId){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/feed/',userId, {headers : headers})
    .map(res => res.json());
  }


  like(postId, userId){
    var bundle = {
      user_id : userId,
      post_id : postId
    }
    console.log(bundle);
    var token = this.loadToken();
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',token);
    return this.http.post('http://localhost:4000/feed/like', bundle, {headers : headers}).map(res => res.json());
  }



   loadToken(){
    return localStorage.getItem('token'); 
 }

  getNumberOfConnections(userId) {
    var token = this.loadToken();
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',token);
    return this.http.post('http://localhost:4000/users/connections', {user_id: userId}, {headers: headers}).map(res => res.json());

  }
}
