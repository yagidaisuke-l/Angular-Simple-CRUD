import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BlogListComponent implements OnInit {
  blogs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.http.get<any[]>('http://localhost:8001/')
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(
        data => this.blogs = data,
        error => console.error('Blogs', this.blogs)
      );
  }

deleteBlog(id: number) {
    console.log('削除処理実行');
    this.http.delete('http://localhost:8001/delete/' + id)
      .subscribe(
        response => {
          console.log('削除が成功しました。レスポンス:', response);
          // 成功時の処理を追加
          // 例: ユーザーに成功メッセージを表示する
          this.getBlogs();
        },
        error => {
          console.error('削除中にエラーが発生しました。エラー:', error);
          // エラー処理を追加
          // 例: ユーザーにエラーメッセージを表示する
        }
      );
}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // クライアント側またはネットワークエラー
      console.error('An error occurred:', error.error.message);
    } else {
      // サーバー側のエラー
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // ユーザー向けのエラーメッセージを返す
    return throwError(
      'Something bad happened; please try again later.');
  }
}