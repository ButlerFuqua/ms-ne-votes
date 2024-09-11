import "jsr:@std/dotenv/load";
import { BillDb, BillDbDTO } from "../models/bill.ts";

const sbApiKey = Deno.env.get("SUPABASE_KEY_ISM")!;
const sbUrl = Deno.env.get("SUPABASE_URL")!;
// const sbRestUrl = Deno.env.get("SUPABASE_REST_URL")!;

import { createClient } from "jsr:@supabase/supabase-js@2";
import { HTTPException } from "jsr:@hono/hono@^4.5.11/http-exception";
import { RollCallVoteDTO, RollCallVoteDB } from "../models/index.ts";
const supabase = createClient(sbUrl, sbApiKey)

export class VotesDbService{

    static async upsertRollCalls(rollCallVotes: RollCallVoteDTO[]): Promise<RollCallVoteDB[]>{
        const { data: upsertedRollCallVotes, error } = await supabase
            .from('roll_call_votes')
            .upsert(rollCallVotes)
            .select();

            if(error){
                throw new HTTPException(500, error);
            }

        return upsertedRollCallVotes ?? [];

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