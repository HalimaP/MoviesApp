import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent implements OnInit {
  newsSub: Subscription;
  articleIndex: number;
  articleData: any;
  title: string = '';
  constructor( private moviesService: MoviesService, private router: Router,
    private route: ActivatedRoute) {
      this.articleData = this.router.getCurrentNavigation().extras.state;
     }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.articleIndex = params['id'];
      this.title = params['title'];

    });
  }

}
