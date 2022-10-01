import { Component } from '@angular/core';
import { FilesService } from './services/files.service';
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

  constructor(private userService: UsersService, private fileService: FilesService){}

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

  downloadPDF(){
    this.fileService.getFile('my.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application.pdf')
    .subscribe()
  }
}
