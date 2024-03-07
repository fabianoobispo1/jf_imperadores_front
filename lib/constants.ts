export const USER_TOKEN = 'user-token'

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY!
const API_ENDPOINT_PROD: string | undefined = process.env.API_ENDPOINT_PROD!

export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.')
  }

  return JWT_SECRET_KEY
}




export function getApi_Endpoint_Prod(): string {
  if (!API_ENDPOINT_PROD || API_ENDPOINT_PROD.length === 0) {
    throw new Error('The environment variable API_ENDPOINT_PROD is not set.')
  }

  return API_ENDPOINT_PROD
}
