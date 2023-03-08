
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class EnviaConsoleLogWhenAddressChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    
    
    handler(event: CustomerAddressChangedEvent): void {
        const eventData = event.eventData;
        console.log(`Endereço do cliente: ${eventData.customerId}, ${eventData.name} alterado para: ${eventData.address}`);
    }


}