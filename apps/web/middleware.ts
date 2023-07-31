export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/create-project', '/user-edit/:path*', '/project-edit/:path*'],
};
