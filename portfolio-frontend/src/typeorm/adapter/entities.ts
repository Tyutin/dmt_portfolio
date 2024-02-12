import * as nextAuthEntities from '../../../../typeorm/src/entities/nextAuth.entity'
import { WorkEntity } from '../../../../typeorm/src/entities/work.entity'

export const defaultEntities = {...nextAuthEntities, WorkEntity}