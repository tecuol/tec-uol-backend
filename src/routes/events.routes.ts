import { Router } from 'express';
import EventsController from '../controllers/events.controller';
const EventsRouts = Router();

EventsRouts.post('/list', EventsController.getList);
EventsRouts.get('/', EventsController.get);
EventsRouts.post('/get', EventsController.get);
EventsRouts.post('/', EventsController.save);
EventsRouts.delete('/', EventsController.delete);

export default EventsRouts;