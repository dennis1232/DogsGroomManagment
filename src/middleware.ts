import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: (auth) => {
      return !!auth?.token?.accessToken;
    },
  },
});

export const config = {
  matcher: ["/appointments/:path*"],
};
