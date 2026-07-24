import { Hono } from 'hono'
import { z } from "zod"
import { nanoid } from "nanoid"
import { cors } from 'hono/cors'


type Env = {
   Bindings: {
      KV: KVNamespace,
      SHORT_DOMAIN: string
   }
}

const app = new Hono<Env>();

//配置跨域请求
app.use('*',cors())

app.get('/', (c) => {
   return c.text('Hello World!')
})

app.get('/api/health', (c) => {
   return c.json({ status: 'healthy', timestamp: Date.now() })
})

const shortenSchema = z.object({
   url: z.string().url({ message: "必须是有效的 URL" }),
})

app.post('/api/shorten', async (c) => {
   const body = await c.req.json();
   const url = shortenSchema.safeParse(body);
   if (!url.success) {
      return c.json({ error: url.error.issues[0]?.message || '请求参数错误' }, 400);
   }
   const validUrl = url.data.url;
   const shortCode = nanoid(6);
   await c.env.KV.put(shortCode, validUrl);
   const shortUrl = `https://${c.env.SHORT_DOMAIN}/${shortCode}`;
   return c.json({ shortUrl });

})

app.get('/api/:code', async (c) => {
   const code = c.req.param('code');
   const url = await c.env.KV.get(code);
   if (!url) {
      return c.text("链接不存在", 404);
   }
   return c.redirect(url, 302);
})

export default app