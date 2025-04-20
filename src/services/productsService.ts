import axios from 'axios';

export interface Product {

  id: number;
  title: string;
  description: string;
  price: number;  
  category: string;  
  image: string;

}

export class ProductsService {
 
  private baseUrl = 'https://fakestoreapi.com/products';


  async getProducts(): Promise<Product[]> {
    const response = await axios.get(this.baseUrl);    
    return response.data;
  }

  async getProduct(id: string): Promise<Product> {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await axios.get(`${this.baseUrl}/search`, { params: { q: query }});
    return response.data.products;
  }
}
