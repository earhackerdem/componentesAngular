import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total: number = 0;
  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  @Input() set productId(id: string | null){
    if(id){
      this.onShowDetails(id);
    }
  }
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onLoadMore = new EventEmitter<string>();
  showProductDetail: boolean = false;
  productChosen: Product = {
    id:'',
    title: '',
    price: 0,
    images : [],
    category :{
      'id': '',
      'name':'',
    },
    description:'',


  };

  statusDetail: 'loading'|'success'| 'error' | 'init' = 'init';

  constructor(private storeService: StoreService, private productService: ProductsService) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  loadMore(){
    this.onLoadMore.emit();
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
    this.statusDetail = 'loading';
    if(!this.showProductDetail){
      this.showProductDetail = true;
    }


    this.productService.getProduct(id)
    .subscribe({
      next: (v) => this.showDetailOk(v),
      error: (e) => this.showDetailError(e),
      complete: () => console.info()
    });
  }

  readAndUpdate(id: string) {
    this.productService.getProduct(id)
      .pipe(
        switchMap(product => this.productService.update(product.id, { title: 'change' })),
       // switchMap(product => this.productService.update(product.id, { title: 'change' })),
       // switchMap(product => this.productService.update(product.id, { title: 'change' }))
      )
      .subscribe(data => {
        console.log(data);
      })

    this.productService.fetchReadAndUpdate(id, { title: 'change' })
      .subscribe(response => {
        const read = response[0];
        const update = response[1];
      })

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

  // loadMore(){
  //   this.productService.getProductByPage(this.limit,this.offset)
  //   .subscribe(data => {
  //     this.products = this.products.concat(data);
  //     this.offset += this.limit;
  //   })
  // }

  showDetailOk(data: Product){
    this.productChosen = data;
    if(!this.showProductDetail){
      this.toggleProductDetail();
    }
    this.statusDetail = 'success';
  }

  showDetailError(errorMessage:string){
    window.alert(errorMessage);
    this.statusDetail = 'error';
  }


}
