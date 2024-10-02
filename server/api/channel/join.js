export default defineEventHandler(async (event) => {
    try {
        const req = event.node.req
        const res = event.node.res
        res.setHeader('Content-Type', 'application/json')
        if (req.method === 'POST') {
            const body = await readBody(event)
            if (!body._id || !body.channel_id) {
                res.statusCode = 400
                return res.end(str({ error: 'Missing parameters' }))
            }
            const result = await post(body)
            return res.end(str(result))
        } else {
            res.statusCode = 405
            return res.end(str({ error: 'Unsupported method' }))
        }
    } catch (e) {
        return res.end(str({ error: e }))
    }
})

async function post({ _id, channel_id }) {
    const result = {
        _id,
        channel_id,
    }
    return result
}