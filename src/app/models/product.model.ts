import { ProductComponent } from "../components/product/product.component";
import { Category } from "./category.models";

export interface Product{
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

export interface CreateProductDTO extends Omit<Product,'id'| 'category'>{
  categoryId: number;
}
