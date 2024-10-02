import DKUser from '~/server/models/user.model'

export default defineEventHandler(async (event) => {
    const req = event.node.req
    const res = event.node.res
    res.setHeader('Content-Type', 'application/json')
    if (req.method === 'POST') {
        const body = await readBody(event)
        if (
            !body.name ||
            !body.email ||
            !body.username ||
            !body.passwd
        ) {
            res.statusCode = 400
            return res.end(str({ error: 'Missing parameters' }))
        }
        const data = await post(body)
        res.end(str(data))
    } else {
        res.statusCode = 405
        return res.end(str({ error: 'Unsupported method' }))
    }
})

async function post({ name, email, username, passwd }) {
    const hash = await Hash(username + passwd + config.SALT)
    const user = new DKUser({
        name, email, username, passwd: hash
    })
    try {
        const result = await user.save()
        return {
            _id: result._id,
            name, email, username
        }
    } catch (e) {
        const errors = {
            11000: 'User already exists!'
        }
        console.log(e)
        return {
            error: errors[e.code] || 'User Creating Failed'
        }
    }
}
