import { Component, OnInit } from '@angular/core';
import {FeedService} from '../../service/feed.service';

@Component({
  selector: 'app-mynetwork',
  templateUrl: './mynetwork.component.html',
  styleUrls: ['./mynetwork.component.css']
})
export class MynetworkComponent implements OnInit {

  constructor(private feedService : FeedService) { }

  ngOnInit() {
  }

}
