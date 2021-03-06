import { insertUser, recuperarUserByEmail, checkUserByEmailESenha } from './repositories/UserRepo.ts'
import { createJwt } from './services/JwtServices.ts'


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

const postLogin = async ({ request, response }: { request: any, response: any }) => {



    const body = await request.body()
    if (!request.hasBody) {
        response.status = 400

        response.body = {
            success: false,
            message: "No data provided",
        };
    }
    try {
        let user = await checkUserByEmailESenha(body.value)
        
        if(user.length === 0){
            response.status = 404
            response.body = {
                message: 'Usuário e senha não conferem',
                status: 404
            }
            return
        }
        
        let jwt = await createJwt(user[0])
        

        response.status = 200;
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





export { postUser, postLogin,  getUserByEmail }