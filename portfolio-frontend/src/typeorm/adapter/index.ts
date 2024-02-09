import {AdapterAccount, AdapterUser, AdapterSession, Adapter } from 'next-auth/adapters'
import { UserEntity, AccountEntity, SessionEntity, VerificationTokenEntity } from '../../../../typeorm/src/entities/nextAuth.entity'
import { getManager } from './manager'

export function TypeORMAdapter(
): Adapter {
  return {
    async getUserByAccount(provider_providerAccountId) {
      const m = await getManager()
      const account = await m.findOne<AdapterAccount & { user: AdapterUser }>(
        'AccountEntity',
        { where: provider_providerAccountId, relations: ['user'] }
      )
      if (!account) return null
      return account.user ?? null
    },
    // @ts-expect-error
    createUser: async (data) => {
      const m = await getManager()
      const user = await m.save('UserEntity', data)
      return user
    },
    async linkAccount(data) {
      const m = await getManager()
      const account = await m.save('AccountEntity', data)
      return account
    },
    // @ts-expect-error
    async getUser(id) {
      const m = await getManager()
      const user = await m.findOne('UserEntity', { where: { id } })
      if (!user) return null
      return { ...user }
    },
    // @ts-expect-error
    async getUserByEmail(email) {
      const m = await getManager()
      const user = await m.findOne('UserEntity', { where: { email } })
      if (!user) return null
      return { ...user }
    },
    // @ts-expect-error
    async updateUser(data) {
      const m = await getManager()
      const user = await m.save('UserEntity', data)
      return user
    },
    async createSession(data) {
      const m = await getManager()
      const session = await m.save('SessionEntity', data)
      return session
    },
    async getSessionAndUser(sessionToken) {
      const m = await getManager()
      const sessionAndUser = await m.findOne<
        AdapterSession & { user: AdapterUser }
      >('SessionEntity', { where: { sessionToken }, relations: ['user'] })

      if (!sessionAndUser) return null
      const { user, ...session } = sessionAndUser
      return { session, user }
    },
    async updateSession(data) {
      const m = await getManager()
      await m.update('SessionEntity', { sessionToken: data.sessionToken }, data)
      return null
    },
    async deleteSession(sessionToken) {
      const m = await getManager()
      await m.delete('SessionEntity', { sessionToken })
    },
  }
}
