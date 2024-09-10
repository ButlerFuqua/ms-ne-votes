import { Context, Hono } from "hono";
import { bearerAuth } from 'hono/bearer-auth';
import "jsr:@std/dotenv/load";
import { HTTPException } from 'hono/http-exception'


export class Middleware{

    app: Hono;
    constructor(app: Hono){
        this.app  = app;
    }

    addMiddleware(){
        this.app.use(async (context: Context, next) => {
            if (!context.req.header()['api-key'] || !Deno.env.get("API_KEY")  || context.req.header()['api-key'] !== Deno.env.get("API_KEY")!) {
                throw new HTTPException(401, { message: 'Unauthorized' })
            }
            await next();
        });
        this.app.use('/*', bearerAuth({ token: Deno.env.get("API_TOKEN")! }));
    }

}