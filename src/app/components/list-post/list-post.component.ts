import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/models/post.model";

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  @Input('listPost') listPost : Post[] = [];

  constructor() { }

  ngOnInit(): void {

  }
}
