import { AuthOptions, User } from 'next-auth'
import NextAuth from 'next-auth/next'
import  VkProvider, {VkProfile}  from 'next-auth/providers/vk';
import { TypeORMAdapter } from '../../../../typeorm/adapter';

const useSecureCookies = (process.env.NEXTAUTH_URL || '').startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : ''; 
const hostName = new URL((process.env.NEXTAUTH_URL || '')).hostname;

const apiVersion = '5.131' // https://vk.com/dev/versions

export const authOptions: AuthOptions = {
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: '.' + hostName,
        secure: useSecureCookies,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        domain: '.' + hostName,
        secure: useSecureCookies,
      }
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: '.' + hostName,
        secure: useSecureCookies,
      }
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 900,
        domain: '.' + hostName,
        secure: useSecureCookies,
      }
    },
    state: {
      name: `${cookiePrefix}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 900,
        domain: '.' + hostName,
        secure: useSecureCookies,
      },
    },
    nonce: {
      name: `${cookiePrefix}next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: '.' + hostName,
        secure: useSecureCookies,
      },
    },
  },
  adapter: TypeORMAdapter(),
  providers: [
    VkProvider({
      clientId: process.env.VK_CLIENT_ID || '',
      clientSecret: process.env.VK_CLIENT_SECRET || '',
      authorization: `https://oauth.vk.com/authorize?scope=email,phone_number,notify,notifications&v=${apiVersion}`,
      token: `https://oauth.vk.com/access_token?v=${apiVersion}&scope=offline,contacts,email`,
      userinfo: `https://api.vk.com/method/users.get?fields=photo_100,photo_max_orig,bdate,has_mobile,sex,timezone&v=${apiVersion}`,
      httpOptions: {
        timeout: 15000
      },
      profile(result: VkProfile) {
        const profile = result.response?.[0] ?? {}
        return {
          id: profile.id.toString(),
          name: [profile.first_name, profile.last_name].filter(Boolean).join(' '),
          email: null,
          image: profile.photo_100,
          firstName: profile.first_name,
          lastName: profile.last_name,
          bdate: profile.bdate,
          imageMax: profile.photo_max_orig,
          slug: profile.id.toString(),
          vkId: profile.id.toString(),
        } as User
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account &&  account.email) {
        user.email = account?.email.toString() || ''
      }
      return true
    },
    async redirect({ url }) {      
      return url
    },
    async session({ session, token, user }) {
      session.user.id = user.id
      session.user.isAdmin = user.isAdmin
      session.user.isBanned = user.isBanned
      return session
    }
  }
}

export const handler = NextAuth(authOptions)