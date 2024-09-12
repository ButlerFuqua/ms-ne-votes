import { Hono } from "https://jsr.io/@hono/hono/4.5.11/src/hono.ts";
import { Context } from "hono";
import "jsr:@std/dotenv/load";


import { HTTPException } from "jsr:@hono/hono@^4.5.11/http-exception";
import { BillsService } from "../services/billsService.ts";

export class AdminController {

    app: Hono;
    billsService: BillsService;
    constructor(app: Hono){
        this.app = app;
        this.billsService = new BillsService();
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
    }

}

