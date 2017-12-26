import { Component, OnInit } from '@angular/core';
import {FeedService} from '../../service/feed.service'
import {AuthService} from '../../service/auth.service';
import {MiniProfileComponent} from '../mini-profile/mini-profile.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  feeds : any;

  constructor(private feedService : FeedService, private authService : AuthService) { }

  ngOnInit() {
    this.authService.getFeeds().subscribe(feeds => {
      this.feeds = feeds.data;
    })
  }

  like(post_id){
    console.log("Inside like()");
    var user = this.authService.getUserData();
    var user_id = user.userId;
    this.feedService.like(post_id, user_id).subscribe(result => {
      if(result.err){
        console.log("Error")
      } else {
        console.log("Liked");
      }
    }) 
  }

}
