import { type NextRequest } from 'next/server'
import { setUserCookie } from '@lib/auth'
import { jsonResponse } from '@lib/utils'

export const config = {
  runtime: 'edge',
}

export default async function auth(req: NextRequest) {

  if (req.method !== 'POST') {
    return jsonResponse(405, { error: { message: 'Método não permitido' } })
  }
 
   //recupera dados do login 
  const {email, password } = await req.json();
 
  try {
    return await setUserCookie(email, password, jsonResponse(200, { success: true }))
  } catch (err) {
    console.error(err)
    return jsonResponse(500, { error: { message: 'Falha na autenticação.' } })
  }
}
