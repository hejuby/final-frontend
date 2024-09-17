import { NextResponse } from "next/server";
// import axios from "axios";
// import type { NextRequest } from "next/server";

export const middleware = (/*request: NextRequest*/) => {
  const response = NextResponse.next();
  // const accessToken = request.cookies.get("accessToken");
  // const data = axios.get(
  //   "https://g6-server.dainreview.kr/api/user/header-info",
  //   { withCredentials: true },
  // );
  // console.log(data);

  // if (!accessToken) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }
  return response;
};

export const config = {
  matcher: ["/community/:path*", "/follows/:path*"],
};
