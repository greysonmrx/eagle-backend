import { Router } from 'express';

import RecipientsController from '../controllers/RecipientsController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const recipientsRouter = Router();
const recipientController = new RecipientsController();

recipientsRouter.use(ensureAuthenticated);
recipientsRouter.post('/', recipientController.store);
recipientsRouter.put('/:id', recipientController.update);

export default recipientsRouter;