import * as nextAuthEntities from '../../../../../../../portfolio-backend/src/next-auth/nextAuth.entity'
import { ProfileEntity } from '../../../../../../../portfolio-backend/src/profile/profile.entity'

export const defaultEntities = {...nextAuthEntities, ProfileEntity}