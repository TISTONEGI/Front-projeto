import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';


async function createUser(email: string, password: string, name: string): Promise<User> {
  const existingUser = await sql<User>`SELECT * FROM users WHERE email=${email}`;
  if (existingUser.rows[0]) {
    throw new Error(`E-mail já existe: ${email}`);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await sql<User>`INSERT INTO users (email, password, name) VALUES (${email}, ${hashedPassword}, ${name}) RETURNING *`;
  return user.rows[0];
}
async function getUser(email: string, password: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    if (!user.rows[0]) {
      return undefined;
    }
    const passwordsMatch = await bcrypt.compare(password, user.rows[0].password);
    if (passwordsMatch) {
      return user.rows[0];
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
       

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
      
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email, password);
          if (!user) {
            try {
              const newUser = await createUser(email, password, 'User');
              return newUser;
            } catch (error:Error | any) {
              if (error.message.includes('E-mail já existe')) {
                return { error: 'E-mail já está em uso' };
              } else {
                throw error;
              }
            }
          } else {
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) return user;
          }
        } else {
          console.log('Credenciais inválidas:', parsedCredentials.error);
        }
        console.log('Credenciais inválidas');
        return null;
      }
      }),
    ],
  });