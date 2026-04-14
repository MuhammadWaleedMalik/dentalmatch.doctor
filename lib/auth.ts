import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        await dbConnect();
        
        // Special case for Master Admin account
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
          adminEmail && adminPassword &&
          credentials.email === adminEmail &&
          credentials.password === adminPassword
        ) {
          // Check if admin exists in DB, if not create one
          let admin = await User.findOne({ email: adminEmail });
          if (!admin) {
             const hashedPassword = await bcrypt.hash(adminPassword, 10);
             admin = await User.create({
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
             });
          }
          return {
            id: admin._id.toString(),
            email: admin.email,
            role: admin.role,
          };
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error('No user found with this email');
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          throw new Error('Incorrect password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          status: user.status || 'active',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
        token.status = (user as any).status;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
        (session.user as any).status = token.status;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev',
};
