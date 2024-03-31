import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from 'src/app/services/auth.service'; 

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  userContentFormGroup!: FormGroup;
  isSubmitted: boolean = false;
  loginError=[false,''];

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userContentFormGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.userContentFormGroup.controls;
  }

  onLoginClick() {
    this.isSubmitted = true;

    if (this.userContentFormGroup.invalid) {
      return;
    }

    const credentials = {
      identifier: this.userContentFormGroup.get('username')?.value, 

      password: this.userContentFormGroup.get('password')?.value
    };

    this.authService.login(credentials).subscribe(
      (response: any) => {
        localStorage.setItem('token', JSON.stringify(response.jwt));
        localStorage.setItem('userId', JSON.stringify(response.user.id));

        console.log(response);
        this.authService.setAuthStatus(true);
        console.log('Authentication status after login:', this.authService.getAuthStatus());
        this.router.navigate(['/']); 
      },
      (error: any) => {
        this.loginError[0]= true;
        this.loginError[1]= error?.error?.error?.message || 'Something Wrong...Please Try again';
        console.error('Login failed:', error);
      }
    );
  }
}
