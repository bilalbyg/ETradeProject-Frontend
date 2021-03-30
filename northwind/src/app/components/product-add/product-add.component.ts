import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm : FormGroup
  constructor(private formsBuilder : FormBuilder,
              private productService : ProductService,
              private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.createProductAddForm()
  }

  createProductAddForm()
  {
    this.productAddForm = this.formsBuilder.group({
      productName : ["",Validators.required],
      unitPrice : ["",Validators.required],
      unitsInStock : ["",Validators.required],
      categoryId: ["",Validators.required]
    })
  }
  
  add()
  {
    if(this.productAddForm.valid)
    {
      let productModel = Object.assign({},this.productAddForm.value)
      this.productService.add(productModel).subscribe(response=>{
        this.toastrService.success(response.message,"Success")
      },
      responseError=>{
        if(responseError.error.Errors.length > 0)
        {
          this.toastrService.error(responseError.error.Errors,"Validation Error")
        }
      })
    }
    else
    {
      this.toastrService.error("Error","Product add form invalid")
    }
  }
}
