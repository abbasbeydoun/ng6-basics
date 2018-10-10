import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  user$: Object;
  userId: number;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.userId = params.id);
  }

  ngOnInit() {
    this.dataService.getUser(this.userId).subscribe((userData) => {
      this.user$ = userData;
    });
  }

}
