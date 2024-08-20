import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { FormUtilsService } from '../../shared/form/form-utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ) { }

  ngOnInit(): void {
    this.initTitle()
    this.initForm();
  }

  onClickSignup() {
    console.log(this.form.value);
    const password = this.form.value.password
    const passwordConfirmation = this.form.value.passwordConfirmation

    if(password !== passwordConfirmation) {
      this.snack.open('Senha está diferente da confirmação de senha.');
      this.input.nativeElement.focus  ();
    }
  }

  togglePasswordConfirmationHidden() {
    this.passwordConfirmationHidden = !this.passwordConfirmationHidden;
  }
  togglePasswordHidden() {
    this.passwordHidden = !this.passwordHidden;
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
}
