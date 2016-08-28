import {Component, ViewChildren, QueryList, ContentChildren} from '@angular/core';
import {Product} from './Models/product';
import {ProductServices} from './Services/product.services';
import {Child2} from './product.component.child2';

@Component({
    selector:'child1' ,
    template:`<label>Select Product Type:</label>
                    <select [ngModel]="dropDownStringArrType[0]" (change)="onSelect($event.target.value)">
                   <option *ngFor ="let type of dropDownStringArrType" value = {{type}}>{{type}}</option>
                    </select>
                    <br/>
                    <child2></child2>
                    `,
    directives:[Child2]
})

export class Child1{
    @ViewChildren(Child2) 
    viewChildren: QueryList<Child2>;
    productArr: Product[] = [];
    dropDownStringArrType: string[] = [];
    constructor(private _prodService:ProductServices){
       }
    displayChild(category:string)
    {
        this.dropDownStringArrType = this._prodService.getProductType(category);
       this._prodService.setAllTheCurrentlyListedProducts();
       this.productArr = this._prodService.getToBeDisplayedProductInfo();
    }
   onSelect(type:string){//For Child2
        this.viewChildren.toArray().forEach((child) => child.displayChild(type));
    }
}