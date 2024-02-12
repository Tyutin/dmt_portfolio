import { DataSource, EntityManager } from "typeorm"
import { parseDataSourceConfig, updateConnectionEntities } from './utils'
import { dataSourceConfig } from '../../../../typeorm/src/config'
import { UserEntity, AccountEntity, SessionEntity, VerificationTokenEntity } from '../../../../typeorm/src/entities/nextAuth.entity'
import { WorkEntity } from '../../../../typeorm/src/entities/work.entity'

let _dataSource: DataSource | undefined
export const entities = {UserEntity, AccountEntity, SessionEntity, VerificationTokenEntity, WorkEntity}

export async function getManager(): Promise<EntityManager> {
  if (!_dataSource) {
    const config = {
      ...parseDataSourceConfig(dataSourceConfig),
      entities: Object.values(entities),
    }
    _dataSource = new DataSource(config)
  }

  const manager = _dataSource?.manager

  if (!manager.connection.isInitialized) {
    await manager.connection.initialize()
  }

  if (process.env.NODE_ENV !== 'production') {
    await updateConnectionEntities(_dataSource, Object.values(entities))
  }
  return manager
}