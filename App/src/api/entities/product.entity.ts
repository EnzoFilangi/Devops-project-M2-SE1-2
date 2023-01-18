import { v4 as uuidv4 } from 'uuid';

export class ProductEntity {
    id: string;
    name: string;
    price: number;
    categories: string[];


    constructor(name: string, price: number, categories: string[]) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.categories = categories;
    }
}