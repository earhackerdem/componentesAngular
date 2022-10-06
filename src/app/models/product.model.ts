import { ProductComponent } from "../shared/components/product/product.component";
import { Category } from "./category.models";

export interface Product{
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<Product,'id'| 'category'>{
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO>{}
