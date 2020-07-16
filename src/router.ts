import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getHello, postUser, getUserByEmail } from './api.ts'


const router = new Router()

router
    .get('/api/v1/hello', getHello)


router
    .post('/api/v1/user', postUser)


router
    .get('/api/v1/user/:email', getUserByEmail)




export default router