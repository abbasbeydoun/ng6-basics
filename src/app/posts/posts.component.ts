import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Object;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPosts().pipe(map(((postData: Object[]) => {

      // modify data here

      // UserId only included in post object, so we get the user's name from their ID and add it to the post object

      postData.forEach((post) => {

        this.dataService.getUser(post['userId']).subscribe((user) => {
          if(post['author'] != 'unknown') {
            post['author'] = user['name'];
          }
        }, (err) => {
          if(err.status != 200) post['author'] = 'unknown';
        });

      });


      this.posts$ = postData;


    }))).subscribe();
  }

}
