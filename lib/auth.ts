import type { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { SignJWT, jwtVerify } from 'jose'
import { USER_TOKEN, getJwtSecretKey, getApi_Endpoint_Prod } from './constants'

interface UserJwtPayload {
  jti: string
  iat: number
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {

  const token = req.cookies.get(USER_TOKEN)?.value
  if (!token) throw new AuthError('Missing user token')

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    )

    return verified.payload as UserJwtPayload
  } catch (err) {
    throw new AuthError('Your token has expired.')
  }
}

/**
 * Adds the user token cookie to a response.
 * realiza ligacao com a API e recebe token
 */
export async function setUserCookie(email:string ,password:string, res: NextResponse) {

  const result =  await fetch(getApi_Endpoint_Prod()+'/fasesao', { method: 'POST', headers:{"Content-Type": "application/json"} ,body: JSON.stringify({
    email,
    password
  })})

  if (result.status !== 200){
    return res.status
  }

  const {token}  =  await result.json()
/* 
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(getJwtSecretKey())) */

  res.cookies.set(USER_TOKEN, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1, // 2 hours in seconds
  })

  return res
}

/**
 * Expires the user token cookie
 */
export function expireUserCookie(res: NextResponse) {
  res.cookies.set(USER_TOKEN, '', { httpOnly: true, maxAge: 0 })
  return res
}