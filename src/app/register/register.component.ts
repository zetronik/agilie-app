import { Component, OnInit } from '@angular/core'
import {PasswordValidators} from 'ngx-validators'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../service/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public buttonSubmit: boolean = false
  public registrationForm: FormGroup
  public email: FormControl
  public password: FormControl
  public confirm: FormControl
  public conditions: FormControl

  constructor(private authService: AuthService, private router: Router) {
    this.email = new FormControl(null, [Validators.required, Validators.email])
    this.password = new FormControl(null, [Validators.required, Validators.pattern(/(?!.*(.)\1)^(?:[A-Za-z0-9])/)])
    this.confirm = new FormControl(null, [Validators.required, Validators.pattern(/(?!.*(.)\1)^(?:[A-Za-z0-9])/)])
    this.conditions = new FormControl(false, [Validators.requiredTrue])

    this.registrationForm = new FormGroup({
      email: this.email,
      password: this.password,
      confirm: this.confirm,
      conditions: this.conditions
    }, PasswordValidators.mismatchedPasswords('password', 'confirm' ))
  }

  submit() {
    if (this.registrationForm.valid) {
      this.buttonSubmit = true
      this.authService.registration(this.registrationForm.value).subscribe(
        data => {
          if (data) {
            this.router.navigate(['dashboard'])
          } else {
            alert('registration false')
            this.buttonSubmit = false
          }
        }
      )
    } else {
      alert('The registration form is not filled')
    }
  }

  ngOnInit(): void {
  }

}
