import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavService} from './nav.service';

interface User {
  name: string;
  cart: number;
  role: number;
  success: boolean;
}

interface Res {
  error: string;
  success: boolean;
}

@Injectable()
export class UserService {

  jwt: string;
  baseUrl: string;
  user: string;
  cart: number;
  isLoading = true;
  role: number;

  USER = 'USER';

  constructor(
    private http: HttpClient,
    private navService: NavService,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
  }


  login(email, password): Observable<any> {
    const user = JSON.stringify({email, password});
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http
      .post<User>(`${this.baseUrl}/auth/login`, user, {
        headers: headers
      })
      .pipe(
        map(res => {
          if (res.success) {
            this.setUser(res);
            return {success: true};
          }
          return res;
        })
      );
  }

  logout(): Observable<any> {
    this.clearUser();
    return this.http.get(`${this.baseUrl}/auth/logout`, {
      responseType: 'text'
    });
  }

  registeruser(data) {
    // if ((data.email === undefined &&
    // data.email !== /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|
    // (".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    //   || (data.password === undefined && data.password !== /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
    //   return;
    // } else {
    console.log(this.baseUrl);
    return this.http.post<Res>(`${this.baseUrl}/auth/reg`, data);
    // }
  }

  isAdmin() {
    if (this.getUser())
      return this.getUser().role === 1;
    else return false;
  }

  getUser() {
    if (localStorage.getItem(this.USER)) {
      const storedUser: User = JSON.parse(localStorage.getItem(this.USER));
      return storedUser;
    } else return null;
  }

  setUser(data: User) {
    localStorage.setItem(this.USER, JSON.stringify(data));
    console.log(data);
    this.user = data.name;
    this.cart = data.cart;
    this.role = data.role;
    this.navService.changeNav(true);
    this.navService.changeCart(data.cart);
  }

  makeUserRequest() {
    const apiUrl = '/api/customer';
    this.http.get<User>(this.baseUrl + apiUrl).subscribe(data => {
      if (data && data.name) {
        this.setUser(data);
        this.isLoading = false;
      }
    });
  }

  clearUser() {
    localStorage.clear();
    this.user = null;
    this.cart = null;
    this.navService.changeNav(false);
  }
}
