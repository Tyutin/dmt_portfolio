'use server'

import { revalidatePath } from "next/cache";
import { UserEntity } from "../../typeorm/src/entities/nextAuth.entity";
import { projectTypeormAdapter } from "./typeorm/projectTypeormAdapter";
import { getPlainObject } from "./utils";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/handler";


export async function updateSelfProfileAction(userInfo: Partial<UserEntity>): Promise<UserEntity | Error> {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return new Error('Не удалось обновить профиль')
  }
  const {firstName, lastName, about, shortInfo, experience, slug} = userInfo
  const updatedUser = await projectTypeormAdapter.users.updateUser(session?.user.id, {firstName, lastName, about, shortInfo, experience, slug})
  revalidatePath('/')
  return getPlainObject<UserEntity | Error>(updatedUser)
}

export async function updateUserAction(userId: string, userInfo: Partial<UserEntity>): Promise<UserEntity | Error> {
  const updatedUser = await projectTypeormAdapter.users.updateUser(userId, userInfo)
  revalidatePath('/')
  return getPlainObject<UserEntity | Error>(updatedUser)
}