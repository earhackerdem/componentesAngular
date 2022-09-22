import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImage = true;
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
    price: 100}
  ];

  onLoaded(img: string){
    console.log("log padre",img);

  }

  toggleImg(){
    this.showImage = !this.showImage;
  }
}
