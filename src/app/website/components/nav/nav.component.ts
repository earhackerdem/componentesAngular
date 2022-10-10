import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('eladmin@mail.com', 'password')
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
  }

  getProfile() {
    this.authService.profile()
      .subscribe(user => {
        this.profile = user;

      })
  }

  loginAndGet() {
    this.authService.login('eladmin@mail.com', 'password')
      .pipe(
        switchMap(rta => {
          this.token = rta.access_token;
          console.log(this.token)
          return this.authService.profile();
        })
      )
      .subscribe(user => this.profile = user);
  }

  getAllCategories() {
    this.categoriesService.getAll()
      .subscribe(data => {
        this.categories = data;
      });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
