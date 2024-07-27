import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.scss'
})

export class BlogCreateComponent implements OnInit {
  blogForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      console.log(this.blogForm.value);
      this.http.put('http://localhost:8001/create', this.blogForm.value)
        .subscribe(response => {
          console.log('登録成功:', response);
        }, error => {
          console.error('登録失敗:', error);
        });
    }
  }
}
