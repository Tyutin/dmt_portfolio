import { getManager } from "./adapter/manager";

import { UserEntity } from "../../../typeorm/src/entities/nextAuth.entity";
import { ProfileType } from "../../../typeorm/src/entities/types/profileType";
import { WorkEntity } from "../../../typeorm/src/entities/work.entity";

function getTypeormAdapter() {
  return {
    users: {
      async getAllUsers(): Promise<UserEntity[]> {
        const manager = await getManager();
        return await manager.find(UserEntity);
      },
      async getUserBySlug(slug: string): Promise<UserEntity | null> {
        const manager = await getManager();
        return await manager.findOne(UserEntity, {
          where: {
            slug,
          },
        });
      },
      async getUserById(id: string): Promise<UserEntity | null> {
        const manager = await getManager();
        return await manager.findOne(UserEntity, {
          where: {
            id,
          },
        });
      },
      async updateUser(
        userId: string,
        userInfo: Partial<UserEntity>
      ): Promise<UserEntity | Error> {
        const manager = await getManager();
        const user = await manager.findOne(UserEntity, {
          where: { id: userId },
        });
        if (!user) {
          return new Error("Пользователь с таким ID не найден", {
            cause: "404",
          });
        }
        Object.assign(user, userInfo);
        return await manager.save(user);
      },
      async updateProfileImage(
        userId: string,
        imageMax: string
      ): Promise<UserEntity | Error> {
        const manager = await getManager();
        const user = await manager.findOne(UserEntity, {
          where: { id: userId },
        });
        if (!user) {
          return new Error("Пользователь с таким ID не найден", {
            cause: "404",
          });
        }
        user.imageMax = imageMax;
        return await manager.save(user)
      },
    },
    students: {
      async getStudents(): Promise<UserEntity[]> {
        const manager = await getManager();
        return await manager.find(UserEntity, {
          where: {
            status: ProfileType.student,
            isHidden: false,
          },
        });
      },
      async getStudentBySlug(slug: string): Promise<UserEntity | null> {
        const manager = await getManager();
        return await manager.findOne(UserEntity, {
          where: {
            slug,
            status: ProfileType.student,
          },
        });
      },
    },
    teachers: {
      async getTeachers(): Promise<UserEntity[]> {
        const manager = await getManager();
        return await manager.find(UserEntity, {
          where: {
            status: ProfileType.teacher,
            isHidden: false,
          },
        });
      },
      async getTeacherBySlug(slug: string): Promise<UserEntity | null> {
        const manager = await getManager();
        return await manager.findOne(UserEntity, {
          where: {
            slug,
            status: ProfileType.teacher,
          },
        });
      },
    },
    wokrs: {
      async addWork(
        userId: string,
        title: string,
        imageName: string
      ): Promise<WorkEntity> {
        const manager = await getManager();
        const user = await manager.findOne(UserEntity, {
          where: { id: userId },
        });
        const work = Object.assign(new WorkEntity(), {
          title,
          imageName,
          user,
        });
        return await manager.save(work);
      },
      async getAllWorks(): Promise<WorkEntity[]> {
        const manager = await getManager();
        return manager.find(WorkEntity, {
          relations: {
            user: true,
          },
          where: {
            user: {
              isBanned: false,
              isHidden: false
            }
          }
        });
      },
    },
  };
}

export const projectTypeormAdapter = getTypeormAdapter();
