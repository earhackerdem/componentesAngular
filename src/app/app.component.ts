import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImage = true;

  constructor(private authService: AuthService, private userService: UsersService){}

  onLoaded(img: string){
  }

  toggleImg(){
    this.showImage = !this.showImage;
  }

  createUser(){
    this.userService.create({
      name: "Earvin",
      email: "earvin@mail.com",
      password: "password"
    })
    .subscribe( rta => {
      console.log(rta)
    });
  }

  login(){
    this.authService.login('earvin@mail.com','password')
    .subscribe( rta => {
      console.log(rta.access_token)
    });
  }

  profile(){

  }
}
