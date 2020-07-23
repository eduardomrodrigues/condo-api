import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts"
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"

const key = "your-secret"

const header: Jose = {
    alg: "HS256",
    typ: "JWT",
}

const payload: Payload = {
    exp: setExpiration(new Date().getTime() + 60000),
}

const createJwt = async (user: any) => {

    console.log(user)

    payload['iss'] = 'condo-api'
    payload['sub'] = 'condomínio'
    payload['nome'] = user.name
    payload['isAdmin'] = user.isAdmin
    payload['torre'] = user.torre
    payload['ap'] = user.ap
    payload['email'] = user.email
    

    
    
    return await makeJwt({ header, payload, key })

}


const validate = (jwt: any) => {

    return validateJwt({ jwt, key, algorithm: "HS256" });
}

export { createJwt, validate }