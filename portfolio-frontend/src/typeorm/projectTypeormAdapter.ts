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
    },
    students: {
      async getStudents(): Promise<UserEntity[]> {
        const manager = await getManager()
        return await manager.find(UserEntity, {
          where: {
            status: ProfileType.student
          }
        })
      },
      async getStudentBySlug(slug: string): Promise<UserEntity | null> {
        const manager = await getManager()
        return await manager.findOne(UserEntity, {
          where: {
            slug,
            status: ProfileType.student
          }
        })
      },
    },
    teachers: {
      async getTeachers(): Promise<UserEntity[]> {
        const manager = await getManager()
        return await manager.find(UserEntity, {
          where: {
            status: ProfileType.teacher
          }
        })
      },
      async getTeacherBySlug(slug: string): Promise<UserEntity | null> {
        const manager = await getManager()
        return await manager.findOne(UserEntity, {
          where: {
            slug,
            status: ProfileType.teacher
          }
        })
      },
    }
  }
}

export const projectTypeormAdapter = getTypeormAdapter()