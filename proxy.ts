import { type NextRequest, NextResponse } from 'next/server';


export default async function proxy(req: NextRequest) {
//   const session = req.auth;
  const {pathname} = req.nextUrl;

     // Allow API auth routes
  if (pathname.startsWith('/auth')) {
    return null;
  }

//   
//  '/login'
  const user = req.cookies.get('user');

   // Not logged in at all
  if (!user) {
    return Response.redirect(new URL("/auth/login", req.url));
  }

//   logged in
if (pathname.startsWith('/auth') && user) {
  return NextResponse.redirect(new URL('/dashboard', req.url));
}

   return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next|favicon.ico|.*\\..*).*)',
};