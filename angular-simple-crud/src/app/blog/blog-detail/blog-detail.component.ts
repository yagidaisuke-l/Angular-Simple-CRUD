import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blogs: any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getBlogs(id);
      }
    });
    console.log('test')
  }

  getBlogs(id: string): void {
    this.http.get<any>(`http://localhost:8001/detail/${id}`)
      .pipe(
        // catchError(this.handleError)
      )
      .subscribe(
        data => {
          this.blogs = data;
          console.log('test2');
          console.log(this.blogs);
        },
        // error => console.error('Error:', error)
      );
    console.log('test')
  }

// private handleError(error: HttpErrorResponse) {
//   if (error.error instanceof Error && error.error.message) {
//     // クライアント側またはネットワークエラー
//     console.error('An error occurred:', error.error.message);
//   } else {
//     // サーバー側のエラー
//     console.error(
//       `Backend returned code ${error.status}, ` +
//       `body was: ${error.error}`); // JSON.stringifyを削除
//   }
//   // ユーザー向けのエラーメッセージを返す
//   return throwError(
//     'Something bad happened; please try again later.');
// }
}