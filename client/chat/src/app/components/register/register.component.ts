import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Validation } from '../../../utils/validation';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
      },
      {
        Validators: Validation,
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    this.authService.registerUser(this.registerForm.value).subscribe(
      (response: any) => {
        if (response.success == true) {
          this.toastr.success(response.message, response.title, {
            timeOut: 10000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(response.message, response.title, {
            timeOut: 10000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }
      },
      (error) => {
        this.toastr.error(error.message, error.status, {
          timeOut: 10000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      }
    );
  }
}
