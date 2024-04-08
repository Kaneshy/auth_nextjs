import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/prisma'
import bcrypt from 'bcrypt'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'jsmith'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials, req) {

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!userFound) throw new Error('No user found')
                console.log('userfound OSO', userFound)

                console.log(userFound.password, credentials.password)

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

                console.log(matchPassword)
                if (!matchPassword) throw new Error('wrong password')

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
