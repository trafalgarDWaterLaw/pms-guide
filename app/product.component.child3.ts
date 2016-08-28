import {Component, ViewChildren, QueryList, ContentChildren} from '@angular/core';
import {Product} from './Models/product';
import {ProductServices} from './Services/product.services';
import {Child4} from './product.component.child4'

@Component({
    selector:'child3' ,
    template:`<div>
            <button (click)="onClick()">VIEW PRODUCT LISTING</button>
            </div>
            <child4></child4>`,
    directives:[Child4]
})

export class Child3{
    @ViewChildren(Child4) 
    viewChildren: QueryList<Child4>;
    productArr: Product[] = [];
    dropDownStringArrBrand: string[] = [];
    constructor(private _prodService:ProductServices){
       }
    setChild(brand:string)
    {
        this._prodService.getTheProductInfo(brand);
      this._prodService.setAllTheCurrentlyListedProducts();
       this.productArr = this._prodService.getToBeDisplayedProductInfo();
    }
   onClick(){//For Child4
         this.viewChildren.toArray().forEach((child) => child.setChild());
    }
}