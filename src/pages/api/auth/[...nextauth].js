import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Here you would typically check the credentials against your database
        if (credentials.username === "user" && credentials.password === "password") {
          return { id: 1, name: "J Smith", email: "jsmith@example.com" };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
};

export default NextAuth(authOptions);