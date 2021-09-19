import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { ModalService } from '../modal/modal.service';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {



moviesSub: Subscription;
articles;
items ="jahhshshhshs";
page;
pageSize;
sorted = new Date();

searchTerm: string;
term = '';
isLoading=true
  constructor(private moviesService: MoviesService, private route: ActivatedRoute,private router:Router, private modalService: ModalService) { }

  ngOnInit() {
    this.moviesSub = this.moviesService.movies.subscribe((data =>{
      this.articles= data;

      console.log(this.articles);
    }))

  this.getArticles(30);

this.moviesService.fetchMoreNews()
console.log(this.moviesService.getArticleByTitle(this.articles))
  }

  ngOnDestroy(){
    if(this.moviesSub){
      this.moviesSub.unsubscribe();
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}
getArticles(results){
if(this.articles){

}
  this.moviesService.getMovies().subscribe((data)=>{

    // console.log(this.articles)
console.log(this.moviesService.getArticleByTitle(this.articles[0]))
});

}
onReadMoreClick(index){
  this.router.navigate(['home', 'read-more', index, this.articles[index].title], {state:this.articles[index]})
  console.log(index, this.articles[index].title)

    }
  loadMore(){
    this.page = this.page +1;


    // this.moviesService.fetchMoreNews(this.pageSize, this.page,this.lastSearchTerm).subscribe((data)=>{
    //   console.log('Added page +');
    // this.sorted =this.items.sort((x, y) => +new Date(x.createdAt) - +new Date(y.createdAt))

    // });
  }
  WordCounter (str: string) {
    var words = str.split(" ").length;
    return words;
  }
}
