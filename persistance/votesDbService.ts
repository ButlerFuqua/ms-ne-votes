import "jsr:@std/dotenv/load";

const sbApiKey = Deno.env.get("SUPABASE_KEY_ISM")!;
const sbUrl = Deno.env.get("SUPABASE_URL")!;
// const sbRestUrl = Deno.env.get("SUPABASE_REST_URL")!;

import { createClient } from "jsr:@supabase/supabase-js@2";
import { HTTPException } from "jsr:@hono/hono@^4.5.11/http-exception";
import { RollCallDB, RollCallVoteDB } from "../models/index.ts";
const supabase = createClient(sbUrl, sbApiKey)

export class VotesDbService{

    static async upsertRollCalls(rollCallVotes: RollCallDB[]): Promise<RollCallDB[]>{        

        const { data: upsertedRollCalls, error } = await supabase
            .from('roll_calls')
            .upsert(rollCallVotes)
            .select();

            if(error){
                throw new HTTPException(500, error);
            }

        console.log('upsertedRollCallVotes legiscan_bill_ids', upsertedRollCalls.map(item => item.legiscan_bill_id))

        return upsertedRollCalls ?? [];

    }

    static async upsertRollCallVotes(rollCallVotes: RollCallVoteDB[]): Promise<RollCallVoteDB[]>{
        const { data: upsertedRollCallVotes, error } = await supabase
            .from('roll_call_votes')
            .upsert(rollCallVotes)
            .select();

            if(error){
                throw new HTTPException(500, error);
            }

        console.log('upsertedRollCallVotes legiscan_bill_ids', upsertedRollCallVotes.map(item => item.legiscan_bill_id))

        return upsertedRollCallVotes ?? [];

    }

    // TODO: Add search capabilities
    static async searchRollCalls() {
        const { data: rollCalls, error } = await supabase
            .from('roll_calls')
            .select('*');
        if (error) {
            throw new HTTPException(500, error);
        }
        return rollCalls;
    }


}