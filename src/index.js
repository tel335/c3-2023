import koa from 'koa'
import bodyParser from 'koa-body'
import router from './routes/index'

const app = new koa()
const port = 3001

app.use(bodyParser({ multipart: true, urlencoded: true }))
app.use(router.routes())

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

export { server, app }
