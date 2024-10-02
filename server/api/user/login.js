import DKUser from '~/server/models/user.model'

export default defineEventHandler(async (event) => {
    try {
        const req = event.node.req
        const res = event.node.res
        res.setHeader('Content-Type', 'application/json')
        if (req.method === 'POST') {
            const body = await readBody(event)
            if (!body.username || !body.passwd) {
                res.statusCode = 400
                return res.end(str({ error: 'Missing parameters' }))
            }
            const user = await post(body)
            return res.end(str(user))
        } else {
            res.statusCode = 405
            return res.end(str({ error: 'Unsupported method' }))
        }
    } catch (e) {
        return res.end(str({ error: e }))
    }
})

async function post({ username, passwd }) {
    const hash = await Hash(username + passwd + config.SALT)
    const user = await DKUser.findOne({ username, passwd: hash }, { passwd: 0 })
    if (user === null) {
        return {
            error: ['User not Found or', 'Username to password Incorrect']
        }
    }
    return user
}
