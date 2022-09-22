import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
