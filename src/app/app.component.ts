import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImage = true;
  token = '';
  email = '';

  constructor(private userService: UsersService){}

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

}
