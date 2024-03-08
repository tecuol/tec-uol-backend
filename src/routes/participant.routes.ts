import { Router } from 'express';
import participantController from '../controllers/participant.controller';
const ParticipantRouts = Router();

ParticipantRouts.post('/list', participantController.getList);
ParticipantRouts.post('/dropdown', participantController.dropdown);
ParticipantRouts.get('/', participantController.get);
ParticipantRouts.post('/get', participantController.get);
ParticipantRouts.post('/', participantController.save);
ParticipantRouts.delete('/', participantController.delete);

export default ParticipantRouts;