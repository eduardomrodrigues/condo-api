import { Router } from 'https://deno.land/x/oak/mod.ts'
import { postUser, getUserByEmail } from './api.ts'


const router = new Router()
const decryptedTokenHandler = (ctx: any, token: any) => {
    ctx.state.userId = token
}


router
    .post('/api/v1/user', postUser)


router
    .get('/api/v1/user/:email', getUserByEmail)




export default router