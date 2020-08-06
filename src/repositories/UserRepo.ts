import { MongoClient } from "https://deno.land/x/mongo@v0.9.1/mod.ts";
import { User } from '../model/User.ts'


const dbName = Deno.env.get("DB_NAME") || "condo_db";
const dbHostUrl = Deno.env.get("DB_HOST_URL") || "mongodb://root:root@localhost:27017";


const connect = async () => {
    const client = new MongoClient();
    client.connectWithUri(dbHostUrl);
    const db = client.database(dbName);
    return await db.collection('users');

}


const insertUser = async (user: User) => {

    const users = await connect()
    const u = await users.find({ email: user.email })
    if (u.length > 0) {
        throw `Já existe usuário com esse email`
    }

    user['isAdmin'] = false
    user['isComplete'] = false
    await users.insertOne(user)

    return user

}

const recuperarUserByEmail = async (_email: string) => {

    const users = await connect()
    return await users.find({ email: _email })
}


const checkUserByEmailESenha = async ({ email: _email, senha: _senha }: { email: string, senha: string }) => {

    const users = await connect()


    return await users.find({ email: _email, senha: _senha })
}



export { insertUser, recuperarUserByEmail, checkUserByEmailESenha }


