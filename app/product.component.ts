import {Component, ViewChildren, QueryList, ContentChildren} from '@angular/core';
import {Product} from './Models/product';
import {ProductServices} from './Services/product.services';
import {ProductMock} from './Mock/product.mock.json';
import {Child1} from './product.component.child1';

@Component({
    selector:'product-parent',
    template:`<h3> Select your Product </h3>
                    <label>Select Product Ctgry</label>
                    <select [ngModel]="dropDownStringArr[0]" (change)="onSelect($event.target.value)">
                   <option *ngFor ="let category of dropDownStringArr" value = {{category}}>{{category}}</option>
                    </select>
                    <br/>
                    <child1></child1>
                    `,
   directives:[Child1],
    providers: [ProductServices]
})

export class ProductMain{
    @ViewChildren(Child1) 
    viewChildren: QueryList<Child1>;
   productArr: Product[] = [];
    dropDownStringArr: string[] = [];
    constructor(private _prodService:ProductServices){
       this.dropDownStringArr = this._prodService.getProductCategory();
       console.log(this.dropDownStringArr);
        this._prodService.setAllTheCurrentlyListedProducts();
       this.productArr = this._prodService.getToBeDisplayedProductInfo();
    }
   onSelect(category:string){//for child1
         this.viewChildren.toArray().forEach((child) => child.displayChild(category)); 
    }
}