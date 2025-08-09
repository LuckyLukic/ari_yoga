import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // true se loggato
  },
});

export const config = {
  matcher: ["/account/:path*"],
};
