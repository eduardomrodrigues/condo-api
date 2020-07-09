import { Router } from './deps.ts'
import { getAllBarbacueSchedules } from './api.ts'


const router = new Router()

router
    .get('/api/v1/barbecue/', getAllBarbacueSchedules)

export default router