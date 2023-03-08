
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderModel from "./order.model";
import OrderItemModel from "./order_item.model";



export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            },
        );
    }


    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
            },
            {
                where: {
                    id: entity.id,
                },
            },
        );

        entity.items.forEach(it => {
            OrderItemModel.update(
                {
                    id: it.id,
                    product_id: it.productId,
                    quantity: it.quantity,
                    name: it.name,
                    price: it.price
                },
                {
                    where: { id: it.id }
                }
            )
        })
    }


    async find(id: string): Promise<Order> {
        let orderModel;

        try {
            orderModel = await OrderModel.findOne(
                {
                    where: {
                        id
                    },
                    rejectOnEmpty: true,
                    include: [OrderItemModel]
                }
            )
        } catch (error) {
            throw new Error("Order not found");
        }

        const orderItems = orderModel.items.map((itemModel) => {
            return new OrderItem(itemModel.id, itemModel.name, itemModel.price, itemModel.product_id, itemModel.quantity);
        })

        return new Order(orderModel.id, orderModel.customer_id, orderItems);

    }


    async findAll(): Promise<Order[]> {
        const orderModel = await OrderModel.findAll(
            {
                include: [OrderItemModel]
            }
        );

        const orders = orderModel.map(orderM => {
            let orderItem = orderM.items.map(oim => {
                return new OrderItem(oim.id, oim.name, oim.price, oim.product_id, oim.quantity);
            })

            return new Order(orderM.id, orderM.customer_id, orderItem);
        })

        return orders;
    }
}