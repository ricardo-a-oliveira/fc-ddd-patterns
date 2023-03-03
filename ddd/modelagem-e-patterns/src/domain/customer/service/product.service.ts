import Product from "../entity/product";



export default class ProductService {




    static increasePrice(products: Product[], percents: number): Product[] {

        products.forEach(product => {
            product.changePrice((product.price * percents / 100) + product.price);
        })

        return products;
    }
}