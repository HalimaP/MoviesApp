import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal/modal.service';
import { MoviesService } from '../service/movies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {

  @ViewChild('SEARCH') SEARCH: ElementRef;

moviesSub: Subscription;
articles;
page;
pageSize;
sorted : Date = new Date();

lastSearchTerm: string;
term = '';
isLoading=true

  constructor(private moviesService: MoviesService, private route: ActivatedRoute,private router:Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.moviesSub = this.moviesService.movies.subscribe((data =>{
      this.articles= data;

      console.log(this.articles);
    }))

  this.getArticles();

// this.moviesService.fetchMoreNews()
console.log(this.moviesService.getArticleByTitle(this.articles))
  }


  ngAfterViewInit(){
    fromEvent(this.SEARCH.nativeElement, 'keyup')
    .pipe(
      filter(Boolean),
      debounceTime(250), //in ms
      distinctUntilChanged(),
      tap((text)=> {
// this.loadMore()
        this.page =1;
        this.lastSearchTerm = this.SEARCH.nativeElement.value;
        this.moviesService.fetchMoreNews(this.pageSize, this.page, this.lastSearchTerm, true).subscribe();
        // this.loadMore()
        console.log(this.SEARCH.nativeElement.value)
      })
    )
    .subscribe()}
    ngOnDestroy(){
      if(this.moviesSub){
        this.moviesSub.unsubscribe();
      }
    }
  open(name,lastname) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.lastname = lastname;

  }

getArticles(){
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


    this.moviesService.fetchMoreNews(this.pageSize, this.page,this.lastSearchTerm).subscribe((data)=>{
      console.log('Added page +');
    this.sorted =this.articles.sort((x, y) => +new Date(x.release_date) - +new Date(y.release_date))

    });
  }
}
