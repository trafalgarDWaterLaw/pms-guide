import {Injectable} from '@angular/core';
import {Product} from '../Models/product';
import {ProductMock} from '../Mock/product.mock.json'

@Injectable() export class ProductServices{

private _productData:Product[];
private _currentSelectedCategory:string = ""; 
private _currentlySelectedType:string = "";
private _currentlySelectedBrand:string = "";
private _currentlyListedProducts:number[] = [];
public strArray:string[] = []; 
public contextArr:string[] = [];
public criteriaArr:any[] = [];
public toBeDisplayedProductInfo:Product[] = [];
constructor()
{
    this._productData = ProductMock;
    this.contextArr = [];
    this.criteriaArr = [];
}
getUniqueArray(columnArray:string[]):string[]{
    let strUniqueArray:string[]=[]; 
    for(let i = 0; i<columnArray.length; i++)
    {
        if(i===0)
        {
            strUniqueArray.push(columnArray[i]);
        }
        else
        {
            console.log(strUniqueArray.find(item=>item==columnArray[i]));
            if((strUniqueArray.find(item=>item==columnArray[i]) == undefined))
            {
                strUniqueArray.push(columnArray[i]);
            }
        }
    }
    return strUniqueArray;
}
getToBeDisplayedProductInfo():Product[]{
 return this.toBeDisplayedProductInfo;
}
setCurrentlyListedproducts(contextArr:string[], criteriaArr:any[]){
    this._currentlyListedProducts = []; //Clearing the searched bucket
    if(contextArr.length == 0){
        this._productData.forEach(element => {this._currentlyListedProducts.push(element.id)
        });
    }
    else if(contextArr.length == 1){
        if(contextArr[0] === 'category'){
         this._productData.forEach(element => {if(element.category === criteriaArr[0]){this._currentlyListedProducts.push(element.id)}
        });
        }
        else if(contextArr[0] === 'type'){
            this._productData.forEach(element => {if(element.type === criteriaArr[0]){this._currentlyListedProducts.push(element.id)}
            });
        }
        else if(contextArr[0] === 'brand'){
            this._productData.forEach(element => {if(element.brand === criteriaArr[0]){this._currentlyListedProducts.push(element.id)}
            });
        }
        else if(contextArr[0] === 'name'){
            this._productData.forEach(element => {if(element.name === criteriaArr[0]){this._currentlyListedProducts.push(element.id)}
            });
        }
        else if(contextArr[0] === 'id'){
            this._productData.forEach(element => {if(element.id === criteriaArr[0]){this._currentlyListedProducts.push(element.id)}
            });
        }
        else if(contextArr[0] === 'avgRating'){
            this._productData.forEach(element => {if(element.avgRating === criteriaArr[0]){this._currentlyListedProducts.push(element.id)}
            });
        }
    }
    else if(contextArr.length == 2){
        this._productData.forEach(element => {if((element.category === criteriaArr[0]) && (element.type === criteriaArr[1]) ){this._currentlyListedProducts.push(element.id)}
        });
    }
    else if(contextArr.length == 3){
        this._productData.forEach(element => {if((element.category === criteriaArr[0]) && (element.type === criteriaArr[1]) && (element.brand === criteriaArr[2]) ){this._currentlyListedProducts.push(element.id)}
        });
    }   
}
getProductCategory():string[]{ //Should be the first one to be called
	this.strArray = []; 
    this._productData.forEach(element => {this.strArray.push(element.category)
        });
        this.strArray = this.getUniqueArray(this.strArray);
       this.contextArr = [];
       this.criteriaArr = [];
        this.setCurrentlyListedproducts(this.contextArr, this.criteriaArr);
    return this.strArray;
}

getProductType(category:string):string[]{ //should be called when product category drop down is selected
    this.strArray = []; 
    this._currentSelectedCategory = category;
    this._productData.forEach(element => {if(element.category === category){this.strArray.push(element.type)}
        });
        this.strArray = this.getUniqueArray(this.strArray);
        this.contextArr = ['category'];
        this.criteriaArr = [this._currentSelectedCategory];
        this.setCurrentlyListedproducts(this.contextArr, this.criteriaArr);
    return this.strArray;
}

getProductBrands(type:string):string[]{ //should be called when product type drop down is selected
    this.strArray = []; 
    this._currentlySelectedType = type;
    this._productData.forEach(element => {if(element.type === type){this.strArray.push(element.brand)}
        });
        this.strArray = this.getUniqueArray(this.strArray);
        this.contextArr = ['category','type'];
        this.criteriaArr = [this._currentSelectedCategory, this._currentlySelectedType];
        this.setCurrentlyListedproducts(this.contextArr, this.criteriaArr);
    return this.strArray;
}

getTheProductInfo(brand:string){ //should be called when product brand drop down is selected
    this._currentlySelectedBrand = brand;
        this.contextArr = ['category','type', 'brand'];
        this.criteriaArr = [this._currentSelectedCategory, this._currentlySelectedType, this._currentlySelectedBrand];
        this.setCurrentlyListedproducts(this.contextArr, this.criteriaArr);
}

setAllTheCurrentlyListedProducts(){
this.toBeDisplayedProductInfo = [];
this._productData.forEach(element => { 
    for(let i = 0; i<this._currentlyListedProducts.length; i++)
    {
        if(element.id === this._currentlyListedProducts[i])
        {
            this.toBeDisplayedProductInfo.push(element);
        }
    }
    
});
}


}

