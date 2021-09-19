import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take, switchMap, tap, map, retry, catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  apiKey = "0ebed85147b017bff4b8e63686c2d8de";
  public movies = new BehaviorSubject<object>(null);
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor( private httpClient: HttpClient) { }
  public getMovies(){
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US`).pipe(
      take(1),
      map((data: any)=>{
        this.movies.next(data.results);
        console.log(data.results)
        return data.results
      }
    )
    );
  }

  fetchMoreNews(pageSize: number = 20, page: number = 1, searchTitle:string ="Given", clearOldData: boolean = false){
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1&title=${searchTitle}&page=${page}&pageSize=${pageSize}`).pipe(
    take(1),
    map((moviesData:any)=>{
      if(clearOldData){
        this.movies.next(moviesData);
      }
      let oldNews:any = this.movies;
      this.movies.next(oldNews.concat(moviesData));
      console.log(moviesData.results)
    })
    );
    }

    getMoviesByIndex(index: number){

      let data =this.movies.value;
      return data[index];
      console.log(data[index])


     }
     // Fetching single article to show in readMore Component
public getArticleByTitle(title:string ){

  return this.httpClient.get(` https://api.themoviedb.org/3/movie/top_rated?&title=${title}&api_key=${this.apiKey}`).pipe(
    take(1),
    map(response=>{
      console.log(response)
      if(response && response['articles']){
        let articles = response['articles'];
        console.log(articles[0])
        return articles[0];

      }
    })
  )
}
}
