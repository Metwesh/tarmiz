import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  AlertComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
  SpinnerComponent,
  TextColorDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    AlertComponent,
    ContainerComponent,
    RowComponent,
    ColComponent,
    SpinnerComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ReactiveFormsModule,
    ButtonDirective,
    NgStyle,
    RouterLink,
  ],
})
export class LoginComponent {
  loginForm!: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;
  isLoading = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Don't need type checking because they will be valid
    const { username, password } = this.loginForm.value as {
      [key in 'username' | 'password']: string;
    };

    this.authService
      .login(username, password)
      .then((res) => {
        if (!res) throw new Error('Login failed');
        this.router.navigate(['/dashboard']);
      })
      .catch((res) => {
        this.errorMessage = 'Invalid credentials, please try again';
        this.isLoading = false;
      });
  }
}
