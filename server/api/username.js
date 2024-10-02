import DKUser from '~/server/models/user.model'

export default defineEventHandler(async (event) => {
    try {
        const req = event.node.req
        const res = event.node.res
        res.setHeader('Content-Type', 'application/json')
        if (req.method === 'POST') {
            const body = await readBody(event)
            if (!body.username) {
                res.statusCode = 400
                return res.end(str({ error: 'Missing parameters' }))
            }
            const response = await get(body)
            res.end(str(response))
        } else {
            res.statusCode = 405
            return res.end(str({ error: 'Unsupported method' }))
        }
    } catch (e) {
        return res.end(str({ error: e }))
    }
})

async function get({ username }) {
    const user = await DKUser.findOne({ username }, { username: 1 })
    return user ? { status: 'ALREADY_TAKEN' } : { status: 'VALID' }
}
