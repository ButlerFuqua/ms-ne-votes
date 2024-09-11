import { Hono } from "https://jsr.io/@hono/hono/4.5.11/src/hono.ts";
import { Context } from "hono";
import "jsr:@std/dotenv/load";


import { VotesService } from "../services/index.ts";
import { HTTPException } from "jsr:@hono/hono@^4.5.11/http-exception";

export class UsersController {

    app: Hono;
    service: VotesService;
    constructor(app: Hono){
        this.app = app;
        this.service = new VotesService();
    }

    addRoutes(){
        this.app.get('/votes', (context: Context) => {
            context.status(200);
            return context.json(this.service.searchAll());
        });

        
        this.app.post('/votes/local/create', async (context: Context) => {

            if(Deno.env.get("ENV") !== 'local'){
                throw new HTTPException(401);
            }

            context.status(200);
            return context.json(await this.service.createAndStoreVotes());
        })
    }

}