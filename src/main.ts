import { Application, Context } from 'https://deno.land/x/oak/mod.ts'
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from './router.ts'
import { validate } from './services/JwtServices.ts'

const port = 1993

const app = new Application()

const checkJwt = async (ctx: Context, next: Function) => {
    console.log(`HTTP ${ctx.request.headers.get('Authorization')} on ${ctx.request.url}`);

    if (ctx.request.url.toString().endsWith("/api/v1/login") && (ctx.request.method === 'POST' || ctx.request.method === 'OPTIONS') ||
        ctx.request.url.toString().endsWith("/api/v1/user") && (ctx.request.method === 'POST' || ctx.request.method === 'OPTIONS')) {




        await next()
    } else {

        let token = await validate(ctx.request.headers.get('Authorization'))

        if (token.isValid) {
            await next()
        } else if (token.isExpired) {

            ctx.response.status = 401
            ctx.response.type = 'application/json'
            ctx.response.body = {
                status: 401,
                mensagem: 'Seu token expirou'
            }

        }
    }
}

app.use(oakCors());
app.use(checkJwt);
app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Server running on port ${port}`)

await app.listen({ port })