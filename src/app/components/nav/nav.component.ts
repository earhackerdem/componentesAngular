import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu: boolean = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor(private storeService: StoreService, private authService: AuthService) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login('earvin@mail.com','password')
    .subscribe( rta => {
      this.token = rta.access_token;
      this.getProfile();
    });
  }

  getProfile(){
    this.authService.profile(this.token)
    .subscribe(user => {
      this.profile = user;

    })
  }

  loginAndGet(){
    this.authService.login('earvin@mail.com','password')
    .pipe(
      switchMap(rta => {
        this.token = rta.access_token;
        return this.authService.profile(this.token);
      })
    )
    .subscribe(user => this.profile = user );
  }

}
