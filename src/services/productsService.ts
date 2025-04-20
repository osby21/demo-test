import axios from 'axios';

export interface Product {
  // id: number;
  // title: string;
  // description: string;
  // price: number;
  // discountPercentage: number;
  // rating: number;
  // stock: number;
  // brand: string;
  // category: string;
  // thumbnail: string;
  // images: string[];

  id: number;
  title: string;
  description: string;
  price: number;  
  category: string;  
  image: string;

  // id: number,
  // categoryId: number,
  // subCategoryId: number,
  // childCategoryId: number,
  // userId: number,
  // name: string,
  // slug: string,
  // brand: string,
  // unitSize: string,
  // status: string,
  // buyerPrice: number,
  // price: number,
  // qty: number,
  // discountPer: number,
  // discount: number,
  // total: number,
  // netPrice: number,
  // photo: string,
  // sortDesc: string,
  // desc: string,
  // createdAt: string,
  // updatedAt: string,
  // SubCategory: {
  //   id: number,
  //   sub_name: string,
  //   category: {
  //     id: number,
  //     name: string
  //   }
  // }
}

export class ProductsService {
  
  // private baseUrl = 'http://localhost:4000';
  // private baseUrl = 'https://dummyjson.com/products';
  private baseUrl = 'https://fakestoreapi.com/products';


  async getProducts(): Promise<Product[]> {
    const response = await axios.get(this.baseUrl);    
    return response.data;
  }

  async getProduct(id: string): Promise<Product> {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  // async getProducts(): Promise<Product[]> {
  //   const response = await axios.get(this.baseUrl);
  //   return response.data.products;
  // }

  // async getProduct(id: string): Promise<Product> {
  //   const response = await axios.get(`${this.baseUrl}/${id}`);
  //   return response.data;
  // }

  // async getProducts(): Promise<Product[]> {
  //   const response = await axios.get(`${this.baseUrl}/api/product/getAllproductList`);
  //   return response.data.product;
  // }

  // async getProduct(id: string): Promise<Product> {
  //   const response = await axios.get(`${this.baseUrl}/api/product/getProductById`, { // ⬅️ La URL base sin "/${id}"
  //       params: { id: id } // ⬅️ Envía el id como query parameter
  //   });    
  //   return response.data.data[0]; // ⬅️ Accede a "data" y toma el primer elemento
  // }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await axios.get(`${this.baseUrl}/search`, { params: { q: query }});
    return response.data.products;
  }
}