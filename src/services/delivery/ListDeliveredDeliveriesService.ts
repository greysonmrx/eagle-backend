import { getCustomRepository, Not, IsNull } from 'typeorm';

import DeliveriesRepository from '../../repositories/DeliveriesRepository';
import DeliverymenRepository from '../../repositories/DeliverymenRepository';

import Delivery from '../../models/Delivery';

import AppError from '../../errors/AppError';

class ListDeliveredDeliveriesService {
  public async execute(deliveryman_id: string): Promise<Delivery[]> {
    const deliverymenRepository = getCustomRepository(DeliverymenRepository);

    const deliveryManExists = await deliverymenRepository.findById(
      deliveryman_id,
    );

    if (!deliveryManExists) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const deliveries = await deliveriesRepository.find({
      where: { deliveryman_id, signature_id: Not(IsNull()) },
      relations: ['recipient', 'deliveryman', 'signature'],
    });

    return deliveries;
  }
}

export default ListDeliveredDeliveriesService;
