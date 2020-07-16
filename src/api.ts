import { insertUser, recuperarUserByEmail } from './repositories/UserRepo.ts'

const getHello = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        msg: 'Welcome to Deno REST API'
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
        await insertUser(body.value)
        response.status = 201;
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





export { getHello, postUser, getUserByEmail }