 import { Hono } from 'hono'

 const app = new Hono();
 app.get('/', (c) => {
    return c.text('Hello World!')
 })

 app.get('/api/health', (c) => {
    return c.json({ status: 'healthy' })
 })

 export default app