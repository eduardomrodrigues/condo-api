import { insertUser, recuperarUserByEmail } from './repositories/UserRepo.ts'
import { createJwt } from './services/JwtServices.ts'


const postJwt = async ({ request, response }: { request: any, response: any }) => {
   
    console.log("NAO NAO MIL VEZES NAO")
   
    if (!request.hasBody) {
        response.status = 400

        response.body = {
            success: false,
            message: "No data provided",
        };
    }
    const body = await request.body()
    response.body = {
        success: true,
        msg: await createJwt(body.value.mensagem)
    }
}


const getJwt = async ({ request, response }: { request: any, response: any }) => {
    if (!request.hasBody) {
        response.status = 400

        response.body = {
            success: false,
            message: "No data provided",
        };
    }
    const body = await request.body()
    response.body = {
        success: true,
        msg: await createJwt(body.value.mensagem)
    }
}


const postUser = async ({ request, response }: { request: any, response: any }) => {

    const body = await request.body()
    if (!request.hasBody) {
        response.status = 400

        response.body = {
            success: false,
            message: "No data provided",
        };
    }
    try {
        let user = await insertUser(body.value)
        let jwt = await createJwt(user)
        response.status = 201;
        response.body = {
            token: jwt
        }
    } catch (error) {
        response.status = 409
        response.body = {
            message: error
        }
    }



}

const getUserByEmail = async ({ params, response }: { params: { email: string }; response: any }) => {


    try {
        const user = await recuperarUserByEmail(params.email)

        if (!user) {
            response.status = 404
            return
        }
        response.body = user
        response.status = 200;
    } catch (error) {
        response.status = 400;
    }


}





export { postJwt, getJwt, postUser, getUserByEmail }