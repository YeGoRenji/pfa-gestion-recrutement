import { NextRequest, NextResponse } from "next/server"


export default function middleware(request: NextRequest) {
  console.log("Middle ware ?");
  console.log(request.body)
  console.log(request.url);
  // return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/admin'
}
