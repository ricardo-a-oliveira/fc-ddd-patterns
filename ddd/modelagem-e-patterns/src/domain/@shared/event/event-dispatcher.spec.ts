import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";

import EnviaConsoleLogWhenAddressChangedHandler from "../../customer/event/handler/envia-console-log-when-address-changed.handler";
import EnviaConsoleLog1Handler from "../../customer/event/handler/envia-console-log1-when-customer-is-created.handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/envia-console-log2-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import Address from "../../customer/value-object/address";

import EventDispatcher from "./event-dispatcher";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";

describe("Event Dispatcher Unit Test", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // verificando se o evento foi registrado
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // verificando se o evento foi registrado
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handler");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // verificando se o evento foi registrado
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toBeCalled();

    });

    it("should notify all handler when customer created", () => {
        const eventDispatcher = new EventDispatcher();
        const customerHandler1 = new EnviaConsoleLog1Handler();
        const customerHandler2 = new EnviaConsoleLog2Handler();
        const spyCustomerHandler1 = jest.spyOn(customerHandler1, "handler");
        const spyCustomerHandler2 = jest.spyOn(customerHandler2, "handler");

        eventDispatcher.register("CustomerCreatedEvent", customerHandler1);
        eventDispatcher.register("CustomerCreatedEvent", customerHandler2);

        // verificando se o evento foi registrado
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(customerHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(customerHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent(
            {
                customerId: "123",
                name: "Joao"
            }
        );

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyCustomerHandler1).toBeCalled();
        expect(spyCustomerHandler2).toBeCalled();


    });

    
    it("should notify all handler when customer address changed", () => {
        const eventDispatcher = new EventDispatcher();
        const customerAddressChangedHandler = new EnviaConsoleLogWhenAddressChangedHandler();
        const spyCustomerHandler = jest.spyOn(customerAddressChangedHandler, "handler");


        eventDispatcher.register("CustomerAddressChangedEvent", customerAddressChangedHandler);

        // verificando se o evento foi registrado
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(customerAddressChangedHandler);

        const address = new Address("Rua X", 123, "01010-010", "cidade");

        const customerAddressChangedEvent = new CustomerAddressChangedEvent(
            {
                customerId: "123",
                name: "Joao",
                address: address
            }
        );

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyCustomerHandler).toBeCalled();

    });
});