import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {FeedService} from '../../service/feed.service';
@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.css']
})
export class MiniProfileComponent implements OnInit {

  profile: any;
  connections: number;

  constructor(private af: AuthService, private fs: FeedService) { }

  ngOnInit() {
    this.profile = this.af.getUserData()
    console.log(this.profile)

    this.fs.getNumberOfConnections(this.profile.userId).subscribe((res)=> {
      this.connections = res.connections;
    });   
  }
}
