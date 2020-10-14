import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignInService } from 'src/app/services/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private signInService: SignInService, private router: Router) {}

  ngOnInit(): void {}

  loading: boolean = false;
  error: string = null;

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email: string = form.value.email;
    const password: string = form.value.password;

    this.loading = true;

    this.signInService.signIn(email, password).subscribe(
      (res) => {
        console.log(res);

        this.router.navigate(['/transactions']);
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.error = err.error.Error;
        this.loading = false;
      }
    );

    form.reset();
  }
}
