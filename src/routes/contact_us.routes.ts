import { Router } from 'express';
import CountactUsController from '../controllers/contact_us.controller';
const CountactUsRouts = Router();

CountactUsRouts.post('/list', CountactUsController.getList);
CountactUsRouts.post('/dropdown', CountactUsController.dropdown);
CountactUsRouts.get('/', CountactUsController.get);
CountactUsRouts.post('/get', CountactUsController.get);
CountactUsRouts.post('/', CountactUsController.save);

export default CountactUsRouts;