import {Component} from '@angular/core';
import {Product} from './Models/product';
import {ProductServices} from './Services/product.services';

@Component({
    selector:'child4' ,
    templateUrl:'app/productViewInfo.html'
})

export class Child4{
    products: Product[] = [];
    constructor(private _prodService:ProductServices){
       }
    setChild()
    {
       this._prodService.setAllTheCurrentlyListedProducts();
       this.products = this._prodService.getToBeDisplayedProductInfo();
    }
}