import {Component, ViewChildren, QueryList, ContentChildren} from '@angular/core';
import {Product} from './Models/product';
import {ProductServices} from './Services/product.services';
import {Child3} from './product.component.child3';

@Component({
    selector:'child2' ,
    template:`<label>Select Product Brnd:</label>
                    <select [ngModel]="dropDownStringArrBrand[0]" (change)="onSelect($event.target.value)">
                   <option *ngFor ="let brand of dropDownStringArrBrand" value = {{brand}}>{{brand}}</option>
                    </select>
                    <br/>
                    <child3></child3>
                    `,
    directives:[Child3]
})

export class Child2{
    @ViewChildren(Child3) 
    viewChildren: QueryList<Child3>;
    productArr: Product[] = [];
    dropDownStringArrBrand: string[] = [];
    constructor(private _prodService:ProductServices){
       }
    displayChild(type:string)
    {
        this.dropDownStringArrBrand = this._prodService.getProductBrands(type);
       this._prodService.setAllTheCurrentlyListedProducts();
       this.productArr = this._prodService.getToBeDisplayedProductInfo();
    }
   onSelect(brands:string){//For Child3
         this.viewChildren.toArray().forEach((child) => child.setChild(brands));
    }
}