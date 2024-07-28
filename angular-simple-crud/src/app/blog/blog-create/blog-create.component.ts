import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.scss'
})

export class BlogCreateComponent implements OnInit {
  blogForm!: FormGroup;
  navigationExtras: NavigationExtras = {
    state: {
      message: ''
    }
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    console.log('登録処理実行');
    if (this.blogForm.valid) {
      console.log(this.blogForm.value);
      this.http.post('http://localhost:8001/create', this.blogForm.value)
        .subscribe({
          next: (response: { status: number }) => {
            console.log('登録', response);
            if (response.status === 200) {
              console.log('登録成功:', response);
              this.navigationExtras = {
                state: {
                  message: 'ブログを作成しました'
                }
              };
              this.router.navigate(['/'], this.navigationExtras); 
            }
          },
          error: (error) => {
            console.error('登録失敗:', error);
          }
        } as Partial<Observer<Object>>);
    }
  }
}
