import { Router } from 'https://deno.land/x/oak/mod.ts'
import { postUser, getUserByEmail, postLogin } from './api.ts'


const router = new Router()


router
    .post('/api/v1/user', postUser)


router
    .get('/api/v1/user/:email', getUserByEmail)

router
    .post('/api/v1/login', postLogin)



export default router