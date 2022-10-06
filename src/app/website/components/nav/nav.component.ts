import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { switchMap } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.models';
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
  categories: Category[] = [];

  constructor(private storeService: StoreService, private authService: AuthService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.loginAndGet('earvin@mail.com','password')
    .subscribe( user => {
      this.profile = user;
    });
  }

  getProfile(){
    this.authService.profile()
    .subscribe(user => {
      this.profile = user;

    })
  }

  loginAndGet(){
    this.authService.login('earvin@mail.com','password')
    .pipe(
      switchMap(rta => {
        this.token = rta.access_token;
        return this.authService.profile();
      })
    )
    .subscribe(user => this.profile = user );
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    });
  }

}
