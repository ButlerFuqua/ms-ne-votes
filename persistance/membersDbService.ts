import "jsr:@std/dotenv/load";
import { BillDb, BillDbLegiscanDTO } from "../models/bill.ts";

const sbApiKey = Deno.env.get("SUPABASE_KEY_ISM")!;
const sbUrl = Deno.env.get("SUPABASE_URL")!;
// const sbRestUrl = Deno.env.get("SUPABASE_REST_URL")!;

import { createClient } from "jsr:@supabase/supabase-js@2";
import { HTTPException } from "jsr:@hono/hono@^4.5.11/http-exception";
import { MemberDb } from "../models/index.ts";
const supabase = createClient(sbUrl, sbApiKey)

export class MembersDbService{

    // TODO add search params
    static async getMemberIds(): Promise<number[]>{
        const { data, error } = await supabase.rpc('get_member_ids_from_votes');


            if(error){
                throw new HTTPException(500, error);
            }

        return data ?? [];

    }

    static async upsertMembers(members: MemberDb[]): Promise<MemberDb[]> {
        const { data: upsertedMembers, error } = await supabase
            .from('members')
            .upsert(members)
            .select();

        if (error) {
            throw new HTTPException(500, error);
        }

        console.log('upsertedMembers names', upsertedMembers.map(item => item.name))

        return upsertedMembers ?? [];

    }


}