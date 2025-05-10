import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Lấy token từ cookie
  const token = request.cookies.get("token")?.value;

  // Nếu có token, kiểm tra role từ payload
  if (token) {
    try {
      // Giải mã token để lấy payload
      const tokenParts = token.split('.');
      
      const payload = JSON.parse(atob(tokenParts[1]));
      const userRole = payload.role;

      // Kiểm tra quyền truy cập cho admin routes
      if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
        if (userRole != 'admin') {
          
          return NextResponse.redirect(new URL("/", request.url));
        }
      }

      // Kiểm tra quyền truy cập cho enterprise routes
      if (pathname.startsWith("/enterprise/") && !pathname.startsWith("/enterprise/login")) {
        if (userRole != 'employer') {
          return NextResponse.redirect(new URL("/enterprise", request.url));
        }
      }

      if (pathname.startsWith("/dashboard/")) {
        if (userRole != 'user') {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }

      // Nếu đã đăng nhập, chuyển hướng khỏi trang login
      if ((pathname === '/login' || pathname === '/admin/login' || pathname === '/enterprise/login') && userRole === 'user') {
        return NextResponse.redirect(new URL('/', request.url));
      }

      if ((pathname === '/login' || pathname === '/admin/login' || pathname === '/enterprise/login') && userRole === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }

      if ((pathname === '/login' || pathname === '/admin/login' || pathname === '/enterprise/login') && userRole === 'enterprise') {
        return NextResponse.redirect(new URL('/enterprise/overview', request.url));
      }
    } catch (err) {

      // Nếu token không hợp lệ, xóa token và chuyển hướng về trang chủ
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('token');
      return response;
    }
  } else {
    // Xử lý khi không có token
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      // Đối với admin routes, chuyển hướng đến /admin/login
      const returnUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(new URL(`/admin/login?returnUrl=${returnUrl}`, request.url));
    } else if (pathname.startsWith('/enterprise/') && pathname !== '/enterprise/login') {
      // Đối với enterprise routes, chuyển hướng đến /enterprise/login
      const returnUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(new URL(`/enterprise/login?returnUrl=${returnUrl}`, request.url));
    } else if (pathname.startsWith('/dashboard/')) {
      // Các dashboard route khác vẫn chuyển hướng đến /login
      const returnUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(new URL(`/login?returnUrl=${returnUrl}`, request.url));
    }
  }

  // Thêm token vào header Authorization cho các API request
  if (pathname.startsWith('/api/') && token && !authHeader) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('Authorization', `Bearer ${token}`);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
}; 
