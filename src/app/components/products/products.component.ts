import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart:Product[] = [];
  total:number = 0;

  products: Product[] = [
    { id: '1',
    name: 'Product 1',
    image: 'https://web-static.wrike.com/cdn-cgi/image/width=880,format=auto,q=80/blog/content/uploads/2015/12/errores-fatales-en-el-lanzamiento-de-un-producto.jpg',
    price: 100},
    { id: '2',
    name: 'Product 1',
    image: 'https://web-static.wrike.com/cdn-cgi/image/width=880,format=auto,q=80/blog/content/uploads/2015/12/errores-fatales-en-el-lanzamiento-de-un-producto.jpg',
    price: 100},
    { id: '3',
    name: 'Product 1',
    image: 'https://web-static.wrike.com/cdn-cgi/image/width=880,format=auto,q=80/blog/content/uploads/2015/12/errores-fatales-en-el-lanzamiento-de-un-producto.jpg',
    price: 100},
    { id: '3',
    name: 'Product 1',
    image: 'https://web-static.wrike.com/cdn-cgi/image/width=880,format=auto,q=80/blog/content/uploads/2015/12/errores-fatales-en-el-lanzamiento-de-un-producto.jpg',
    price: 100},
    { id: '3',
    name: 'Product 1',
    image: 'https://web-static.wrike.com/cdn-cgi/image/width=880,format=auto,q=80/blog/content/uploads/2015/12/errores-fatales-en-el-lanzamiento-de-un-producto.jpg',
    price: 100},
    { id: '3',
    name: 'Product 1',
    image: 'https://web-static.wrike.com/cdn-cgi/image/width=880,format=auto,q=80/blog/content/uploads/2015/12/errores-fatales-en-el-lanzamiento-de-un-producto.jpg',
    price: 100}
  ];

  constructor(private storeService: StoreService) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
  }

  onAddToShoppingCart(product:Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }



}
