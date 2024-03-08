import { Router } from 'express';
import participantTypeController from '../../controllers/masters/participant_type.controller';
const ParticipantTypeRouts = Router();

ParticipantTypeRouts.post('/list', participantTypeController.getList);
ParticipantTypeRouts.post('/dropdown', participantTypeController.dropdown);
ParticipantTypeRouts.get('/', participantTypeController.get);
ParticipantTypeRouts.post('/', participantTypeController.save);
ParticipantTypeRouts.delete('/', participantTypeController.delete);

export default ParticipantTypeRouts;