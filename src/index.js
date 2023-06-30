import koa from 'koa'
import bodyParser from 'koa-body'
import router from './routes/index'

const app = new koa();
const port = 3000;

app.use(bodyParser());
app.use(router.routes());

const server = app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

export { server, app };
