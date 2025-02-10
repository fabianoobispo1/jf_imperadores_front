import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Rotas que precisam de permissão de admin
const adminRoutes = [
  /*   '/dashboard/administracao', */
  '/dashboard/seletiva',
  /*   '/dashboard/presenca',
  '/dashboard/atletas',
  '/dashboard/configuracoes',
  '/dashboard/configwhatsapp',
  '/dashboard/financeiro',
  '/dashboard/mensagens',
  '/dashboard/mensalidade',
  '/dashboard/Mensalidades',
  '/dashboard/seletivaexercicios',
  '/dashboard/seletivaimg', */
]

export async function middleware(request: Request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  console.log('Token:', token) // Para debug
  console.log('Role:', token?.role) // Para debug

  // Verifica se a rota atual está na lista de rotas admin
  const isAdminRoute = adminRoutes.some((route) => request.url.includes(route))

  // Se for rota admin e usuário não for admin, redireciona
  if (isAdminRoute && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
