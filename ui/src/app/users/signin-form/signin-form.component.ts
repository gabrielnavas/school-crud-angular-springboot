import { Component, ElementRef, HostListener } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormUtilsService } from '../../shared/form/form-utils.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../shared/services/token-storage.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss'
})
export class SigninFormComponent {

  form!: FormGroup;

  passwordHidden = false
  passwordConfirmationHidden = false

  constructor(
    private readonly title: Title,
    private readonly formBuilder: NonNullableFormBuilder,
    protected readonly formUtilsService: FormUtilsService,
    private readonly snack: MatSnackBar,
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.initTitle()
    this.initForm();
  }

  onClickSignin() {
    if (this.form.invalid) {
      this.formUtilsService.validateAllFormFields(this.form)
    } else {
      this.usersService.signin({
        email: this.form.value.email,
        password: this.form.value.password,
      }).subscribe({
        next: response => {
          this.tokenStorage.token = response.token;
          this.router.navigate(['/courses']);
          this.snack.open("Bem-vindo(a) novamente!", 'X', { 
            duration: 5000, 
            horizontalPosition: 'right', verticalPosition: 'top' 
          })
        },
        error: err => {
          this.snack.open(err.error.message)
        }
      })
    }
  }

  togglePasswordHidden() {
    this.passwordHidden = !this.passwordHidden;
  }

  onClickMoveToSignup() {
    this.router.navigate(['/users/signup'])
  }

  private initTitle() {
    this.title.setTitle('School Platform | Logar na plataforma')
  }

  private initForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
      ]],
      password: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
      ]],
    });
  }

  @HostListener('document:keydown.enter', ['$event'])
  private handleEscKey(event: KeyboardEvent) {
    this.onClickSignin();
  }
}
