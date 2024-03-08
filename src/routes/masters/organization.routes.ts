import { Router } from 'express';
import OrganizationController from '../../controllers/masters/organization.controller';
const OrganizationRouts = Router();

OrganizationRouts.post('/list', OrganizationController.getList);
OrganizationRouts.post('/dropdown', OrganizationController.dropdown);
OrganizationRouts.get('/', OrganizationController.get);
OrganizationRouts.post('/', OrganizationController.save);
OrganizationRouts.delete('/', OrganizationController.delete);

export default OrganizationRouts;