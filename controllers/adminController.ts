import { Hono } from "https://jsr.io/@hono/hono/4.5.11/src/hono.ts";
import { Context } from "hono";
import "jsr:@std/dotenv/load";


import { HTTPException } from "jsr:@hono/hono@^4.5.11/http-exception";
import { VotesService, BillsService } from "../services/index.ts";

export class AdminController {

    app: Hono;
    billsService: BillsService;
    votesService: VotesService;
    constructor(app: Hono){
        this.app = app;
        this.billsService = new BillsService();
        this.votesService = new VotesService();
    }

    addRoutes(){

        this.app.post('/admin/create-bills-legiscan', async (context: Context) => {

            if (Deno.env.get("ENV") !== 'local') {
                throw new HTTPException(401);
            }

            context.status(200);
            const body = await context.req.json();
            return context.json(await this.billsService.createBillsFromLegiscanApi({ states: body["states"] }));
        });

        this.app.post('/admin/create-roll-calls-legiscan-and-db', async (context: Context) => {

            if (Deno.env.get("ENV") !== 'local') {
                throw new HTTPException(401);
            }

            context.status(200);
            return context.json(await this.votesService.createRollCallsFromLegiscanAndDb());
        });

        this.app.post('/admin/create-votes-legiscan-and-db', async (context: Context) => {

            if (Deno.env.get("ENV") !== 'local') {
                throw new HTTPException(401);
            }

            context.status(200);
            return context.json(await this.votesService.createVotesFromLegiscanAndDb());
        });
    }

}

