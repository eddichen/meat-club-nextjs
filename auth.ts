import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { getUsers } from "@/lib/users";

const getUserOptions = async () => {
  "use server";

  const userData = await getUsers();
  const { rows: users } = userData;
  return users;
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const members = await getUserOptions();
      if (
        user &&
        members.filter((member) => member.email === user.email).length > 0
      ) {
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/add-event`;
    },
  },
});
