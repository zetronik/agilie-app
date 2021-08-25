import { Component, OnInit } from '@angular/core'
import {PasswordValidators} from 'ngx-validators'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../service/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registrationForm: FormGroup
  public email: FormControl
  public password: FormControl
  public confirm: FormControl
  public conditions: FormControl

  constructor(private authService: AuthService) {
    this.email = new FormControl('mail@mail.com', [Validators.required, Validators.email])
    this.password = new FormControl('', [Validators.required, Validators.pattern(/(?!.*(.)\1)^(?:[A-Za-z0-9])/)])
    this.confirm = new FormControl('', [Validators.required, Validators.pattern(/(?!.*(.)\1)^(?:[A-Za-z0-9])/)])
    this.conditions = new FormControl(false, [Validators.requiredTrue])

    this.registrationForm = new FormGroup({
      email: this.email,
      password: this.password,
      confirm: this.confirm,
      conditions: this.conditions
    }, PasswordValidators.mismatchedPasswords('password', 'confirm' ))
  }

  submit() {
    console.log(this.registrationForm)
    this.authService.registration(this.registrationForm.value).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  ngOnInit(): void {
  }

}
