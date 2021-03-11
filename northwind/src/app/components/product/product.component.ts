import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductResponseModel } from 'src/app/models/productResponseModel';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products : Product[]= []
  dataLoaded = false;
  
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    // This is working method when this component open  
    this.getProducts()
  }

  getProducts()
  {
    this.productService.getProducts().subscribe(response => 
      {
        this.products = response.data
        this.dataLoaded = true
      })
  }
}
