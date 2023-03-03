import Customer from "../entity/customer";
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service";

describe("Order Service Unit Test", () => {

    it("should place an order", () => {

        // regra de pontos, os pontos são metade do valor da ordem, p.ex ordem total 10 pontos 5
        // place order é igual a criar uma ordem para um cliente

        const item = new OrderItem("i1", "Item 1", 10, "p1", 1);
        const customer = new Customer("c1", "Joao");


        const order = OrderService.placeOrder(customer, [item]);

        expect( order.total()).toBe(10);
        expect( customer.rewardPoints).toBe(5)




    })



    it("should get total of all orders", () => {

        const item1 = new OrderItem("i1", "item 1", 100, "p1", 1);
        const item2 = new OrderItem("i2", "item 2", 200, "p2" ,2);

        const order1 = new Order("1", "123", [item1]);
        const order2 = new Order("2", '123', [item2]);

        let total = OrderService.total([order1, order2]);

        expect(total).toBe(500);


    })
})