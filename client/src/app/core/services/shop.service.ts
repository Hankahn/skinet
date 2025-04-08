import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Pagination} from '../../shared/models/pagination';
import {Product} from '../../shared/models/product';
import {ShopParams} from '../../shared/models/showParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  types: string[] = [];
  brands: string[] = [];

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brands.length > 0) {
      params = params.append('brands', shopParams.brands.join(','));
    }

    if (shopParams.types.length > 0) {
      params = params.append('types', shopParams.types.join(','));
    }

    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageIndex', shopParams.pageIndex);
    params = params.append('pageSize', shopParams.pageSize);

    return this.http.get<Pagination<Product>>(`${this.baseUrl}products`,
      {params: params});
  }

  getBrands() {
    if (this.brands.length > 0) {
      return this.brands;
    }

    return this.http.get<string[]>(`${this.baseUrl}products/brands`).subscribe({
        next: response => this.brands = response
      }
    );
  }

  getTypes() {
    if (this.types.length > 0) {
      return this.types;
    }

    return this.http.get<string[]>(`${this.baseUrl}products/types`).subscribe({
        next: response => this.types = response
      }
    );
  }

}
