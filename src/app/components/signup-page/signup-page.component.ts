import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  userContentFormGroup!: FormGroup;
  isSubmitted: boolean = false;
  signupError=[false,''];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userContentFormGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter method to access form controls
  get formControls() {
    return this.userContentFormGroup.controls;
  }

  onSignupClick() {
    console.log('Signup button clicked');

    this.isSubmitted = true;

    // If form is invalid, do not proceed
    if (this.userContentFormGroup.invalid) {
      return;
    }

    // Create an object with user credentials
    const credentials = {
      username: this.userContentFormGroup.get('username')?.value,
      email: this.userContentFormGroup.get('email')?.value,
      password: this.userContentFormGroup.get('password')?.value
    };

    // auth register 
    this.authService.register(credentials).subscribe({
      next: (response: any) => {
        console.log(response);
        alert('Account created successfully!');
        this.router.navigate(['/login']); // navigate
      },
      error: (error) => {
        this.signupError[0]= true;
        this.signupError[1]= error?.error?.error?.message || 'Something Wrong...Please Try again';
        console.error('Registration failed:', error);
      
      }
    });
  }
}
