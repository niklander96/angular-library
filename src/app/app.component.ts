import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private http: HttpClient) {
  }

  login() {
    this.http.post('/auth/login', { username: 'admin', password: 'admin' })
      .subscribe((res) => {
        console.log(res); // { token: 'fake-jwt-token' }
      });
  }
}
