export interface Product{
    id:number;
    name:string;
    type:string;
    brand:string;
    category:string;
    cost:number;
    currency:string;
    image_src?:string;
    avgRating?:number;
    comments:Comments[];
}

export interface Comments
{
    name:string;
    desc?:string;
    ratings?:number;
}