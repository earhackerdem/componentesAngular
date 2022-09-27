import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total: number = 0;
  products: Product[] = [];
  showProductDetail: boolean = false;
  productChosen: Product = {
    id:'',
    title: '',
    price: 0,
    images : [],
    category :{
      'id': '',
      'name':'',
      typeImg: ''
    },
    description:'',


  };
  limit: number = 10;
  offset: number = 0;

  constructor(private storeService: StoreService, private productService: ProductsService) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productService.getProductByPage(10,0)
      .subscribe(data => {
       this.products = data;
      })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  addToShoppingCart(){
    this.storeService.addProduct(this.productChosen);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetails(id:string){
    //en caso de que den dos veces al botón solo ocultara los detalles(para no ir a darle al botón de cerrar)
    if(this.productChosen.id != '' && this.productChosen.id == id && this.showProductDetail==true){
      this.showProductDetail = false;
      return;
    }

    //en caso de que seleccionen el mismo producto ya no hay necesidad de hacer la petición de nuevo y solo vuelve a mostrar el panel
    if(this.productChosen.id != '' && this.productChosen.id == id && this.showProductDetail==false){
      this.showProductDetail = true;
      return;
    }
    //en caso que le den al botón de ver detalles mientras ya están abiertos los de un producto diferente cierra el panel de detalles
    if(this.productChosen.id != '' && this.productChosen.id != id && this.showProductDetail==true){
      this.showProductDetail = false;
    }

    this.productService.getProduct(id)
    .subscribe(data => {
      this.productChosen = data;
      if(!this.showProductDetail){
        this.toggleProductDetail();
      }

    });
  }

  createNewProduct(){
    const product:CreateProductDTO = {
      title: 'Nuevo producto',
      description:'Descripción del producto',
      price : 3500,
      images:[`https://placeimg.com/640/480/any?random=$%7BMath.random()%7D`],
      categoryId:2,

    }
    this.productService.create(product)
    .subscribe(data =>{
     this.products.unshift(data);
    });
  }

  updateProduct(){
    const changes: UpdateProductDTO = {
      title:'change title',
    }
    const id = this.productChosen.id;

    this.productService.update(id,changes)
    .subscribe( data =>{
      const productIndex = this.products.findIndex( item => item.id == this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    })
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex( item => item.id === this.productChosen.id);
      this.products.splice(productIndex,1);
      this.showProductDetail = false;

    });
  }

  loadMore(){
    this.productService.getProductByPage(this.limit,this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }


}
