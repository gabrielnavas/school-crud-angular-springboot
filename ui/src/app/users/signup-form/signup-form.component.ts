import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { FormUtilsService } from '../../shared/form/form-utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent implements OnInit {

  form!: FormGroup;

  passwordHidden = false
  passwordConfirmationHidden = false

  @ViewChild('passwordInput') input!: ElementRef<HTMLInputElement>;

  constructor(
    private readonly title: Title,
    private readonly formBuilder: NonNullableFormBuilder,
    protected readonly formUtilsService: FormUtilsService,
    private readonly snack: MatSnackBar,
    private readonly usersService: UsersService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.initTitle()
    this.initForm();
  }

  onClickSignup() {
    const password = this.form.value.password
    const passwordConfirmation = this.form.value.passwordConfirmation

    if (password !== passwordConfirmation) {
      this.snack.open('Senha está diferente da confirmação de senha.');
      this.input.nativeElement.focus();
    } else if (this.form.invalid) {
      this.formUtilsService.validateAllFormFields(this.form)
    } else {
      this.usersService.signup({
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        dateOfBirth: this.form.value.dateOfBirth,
        email: this.form.value.email,
        password: this.form.value.password,
        passwordConfirmation: this.form.value.passwordConfirmation,
      }).subscribe({
        next: () => {
          this.snack.open("Cadastrado com sucesso. Faça o login!");
          this.onClickMoveToSignin();
        },
        error: err => {
          this.snack.open(err.error.message)
        }
      })
    }
  }

  togglePasswordConfirmationHidden() {
    this.passwordConfirmationHidden = !this.passwordConfirmationHidden;
  }
  togglePasswordHidden() {
    this.passwordHidden = !this.passwordHidden;
  }

  onClickMoveToSignin() {
    this.router.navigate(['/users/signin'])
  }

  private initTitle() {
    this.title.setTitle('School Platform | Criar conta')
  }

  private initForm() {
    this.form = this.formBuilder.group({
      firstname: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
      ]],
      lastname: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
      ]],
      email: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
      ]],
      password: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
      ]],
      passwordConfirmation: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
      ]],
      dateOfBirth: ['', [Validators.required]],
    });
  }

  @HostListener('document:keydown.enter', ['$event'])
  private handleEscKey(event: KeyboardEvent) {
    this.onClickSignup();
  }
}
