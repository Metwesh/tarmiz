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
  ButtonGroupComponent,
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
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

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
    ButtonGroupComponent,
  ],
})
export class LoginComponent {
  loginForm!: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;
  isLoading = false;
  errorMessage: string = '';

  mailingListForm!: FormGroup<{
    email: FormControl<string | null>;
  }>;
  isMailingListLoading = false;
  mailingListErrorMessage: string = '';
  mailingListSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.mailingListForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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

  onJoinMailingList(): void {
    if (this.mailingListForm.invalid) {
      return;
    }
    const email = this.mailingListForm.get('email')?.value;

    this.isMailingListLoading = true;
    this.mailingListErrorMessage = '';
    this.mailingListSuccess = false;

    // Add your logic here, e.g., call a service to send the email
    this.http
      .post('https://srvapi.tarmiiz.com/general/waitlist', { email })
      .subscribe({
        next: () => {
          this.mailingListSuccess = true;
          this.mailingListErrorMessage = '';
          this.isMailingListLoading = false;
        },
        error: () => {
          this.mailingListErrorMessage =
            'An error occurred while joining the mailing list. Please try again.';
          this.isMailingListLoading = false;
        },
      });
  }
}
