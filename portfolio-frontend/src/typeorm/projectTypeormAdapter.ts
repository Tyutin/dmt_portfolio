import { getManager } from "./adapter/manager"

import { UserEntity } from "../../../typeorm/src/entities/nextAuth.entity"
import { ProfileType } from "../../../typeorm/src/entities/types/profileType"

function getTypeormAdapter() {
  return {
    users: {
      async getAllUsers(): Promise<UserEntity[]> {
        const manager = await getManager()
        return await manager.find(UserEntity)
      },
      async getUserBySlug(slug: string): Promise<UserEntity | null> {
        const manager = await getManager()
        return await manager.findOne(UserEntity, {
          where: {
            slug,
          }
        })
      },
      async getUserById(id: string): Promise<UserEntity | null> {
        const manager = await getManager()
        return await manager.findOne(UserEntity, {
          where: {
            id,
          }
        })
      },
    },
    students: {
      async getStudents(): Promise<UserEntity[]> {
        const manager = await getManager()
        return await manager.find(UserEntity, {
          where: {
            status: ProfileType.student,
            isHidden: false
          }
        })
      },
      async getStudentBySlug(slug: string): Promise<UserEntity | null> {
        const manager = await getManager()
        return await manager.findOne(UserEntity, {
          where: {
            slug,
            status: ProfileType.student,
            isHidden: false
          }
        })
      },
    },
    teachers: {
      async getTeachers(): Promise<UserEntity[]> {
        const manager = await getManager()
        return await manager.find(UserEntity, {
          where: {
            status: ProfileType.teacher,
            isHidden: false
          }
        })
      },
      async getTeacherBySlug(slug: string): Promise<UserEntity | null> {
        const manager = await getManager()
        return await manager.findOne(UserEntity, {
          where: {
            slug,
            status: ProfileType.teacher,
            isHidden: false
          }
        })
      },
    }
  }
}

export const projectTypeormAdapter = getTypeormAdapter()