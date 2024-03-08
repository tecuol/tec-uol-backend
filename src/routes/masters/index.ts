import { Router } from "express";
import StateCityRouts from "./stateCity.routes";
import AddressRouts from "./address.routes";
import ParticipantTypeRouts from "./participant-type.routes";
import OrganizationRouts from "./organization.routes";

export const MasterRouts = Router();

MasterRouts.use('/sc', StateCityRouts);
MasterRouts.use('/address', AddressRouts);
MasterRouts.use('/participant-type', ParticipantTypeRouts);
MasterRouts.use('/organization', OrganizationRouts);
