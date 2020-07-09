export { MongoClient } from "./deps.ts";

const getAllBarbacueSchedules = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        msg: 'Welcome to Deno REST API'
    }
}

export { getAllBarbacueSchedules }