import { Component, OnInit } from '@angular/core';
import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imgParent = '';
  showImage = true;
  token = '';
  email = '';
  imgRta = '';

  constructor(
    private userService: UsersService,
    private fileService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(){
    const token = this.tokenService.getToken();
    if(token){
      this.authService.profile()
      .subscribe(user=>console.log(user))
    }
  }

  onLoaded(img: string) {
  }

  toggleImg() {
    this.showImage = !this.showImage;
  }

  createUser() {
    this.userService.create({
      name: "Earvin",
      email: "earvin@gmail.com",
      password: "password",
      role: 'customer'
    })
      .subscribe(rta => {
        console.log(rta)
      });
  }

  downloadPDF() {
    this.fileService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application.pdf')
      .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file)
        .subscribe(rta => {
          this.imgRta = rta.location;
        })
    }

  }
}
