import { getManager } from "./adapter/manager"

import { UserEntity } from "../../../typeorm/src/entities/nextAuth.entity"

function getTypeormAdapter() {
  return {
    async getAllUsers(): Promise<UserEntity[]> {
      const manager = await getManager()
      return await manager.find(UserEntity)
    }
  }
}

export const projectTypeormAdapter = getTypeormAdapter()