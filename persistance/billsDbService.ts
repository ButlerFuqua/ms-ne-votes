import "jsr:@std/dotenv/load";
import { BillDb, BillDbLegiscanDTO } from "../models/bill.ts";

const sbApiKey = Deno.env.get("SUPABASE_KEY_ISM")!;
const sbUrl = Deno.env.get("SUPABASE_URL")!;
// const sbRestUrl = Deno.env.get("SUPABASE_REST_URL")!;

import { createClient } from "jsr:@supabase/supabase-js@2";
import { HTTPException } from "jsr:@hono/hono@^4.5.11/http-exception";
const supabase = createClient(sbUrl, sbApiKey)

export class BillsDbService{

    static async upsertBills(bills: BillDbLegiscanDTO[]): Promise<BillDb[]>{
        const { data: upsertedBills, error } = await supabase
            .from('bills')
            .upsert(bills)
            .select();

            if(error){
                throw new HTTPException(500, error);
            }

        return upsertedBills ?? [];

    }

    // TODO: Add search capabilities
    static async searchBills(){
        const { data: bills, error } = await supabase
            .from('bills')
            .select('*');
            if(error){
                throw new HTTPException(500, error);
            }
        return bills;
    }

}