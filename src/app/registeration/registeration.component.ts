import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {
  email: string;
  password: string;
  login = true;
  loginErr = 'Invalid email and or password.' +
    'your email must follow the form: example@EX.com' +
    'your password must follow the form: at least 8 characters, uppercase letter, lowercase letter, digits, special character';
  err = 'Please Enter a valid email or password ' +
    'your email must follow the form: example@EX.com ' +
    'your password must follow the form: at least 8 characters, uppercase letter, lowercase letter, digits, special character'
  ;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    password: new FormControl('', [Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)])
  });
  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  // registerUser(value: string, value2: string) {
  //
  //   if (value && value2) {
  //     const obj = {
  //       username: value,
  //       password: value2
  //     };
  //
  //     this.userService.registeruser(obj).subscribe(
  //       data => {
  //         if (data.success) {
  //           this.router.navigate(['login']);
  //         } else {
  //           this.loginErr = data.error;
  //           this.login = false;
  //         }
  //       }
  //     );
  //   } else {
  //     this.loginErr = 'please fill data';
  //     this.login = false;
  //   }
  // }

  // submitForm(){
  //   console.log(this.form.get('email').value);
  //   console.log(this.form.get('password'));
  // }
  registerUser() {
    // console.log('inside register function',  this.form.get('email').value);
    const obj = {
      username: this.form.get('email').value,
      password: this.form.get('password').value
    };
    if (this.form.valid) {
      console.log(obj);
      this.userService.registeruser(obj).subscribe(
        data => {
          if (data.success) {
            this.router.navigate(['login']);
          } else {
            this.loginErr = data.error;
            this.login = false;
          }
        }
      );
    } else {
      this.loginErr = this.err;
      this.login = false;
    }
  }
}
