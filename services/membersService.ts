import "jsr:@std/dotenv/load";

import { BillLegiscanPopulated, RollCallLegiscan, RollCallVoteDTO } from "../models/index.ts";
import { BillsDbService } from "../persistance/billsDbService.ts";
import { BillsService } from "./billsService.ts";
import { isVoteRollCallXmlValid, getMinFiveDigitStringFromNumber, getRollCallDbFromBillLegiscanVoteItem, getRollCallVoteDbFromBillLegiscanVote,  } from "../utils/index.ts";
import { VotesDbService } from "../persistance/votesDbService.ts";
import { getBillDTOFromLegiscanBill } from "../utils/billUtils.ts";
import { RollCallDB, RollCallVoteDB } from "../models/vote.ts";
import _default from "npm:@supabase/postgrest-js@1.16.1";
import { MembersDbService } from "../persistance/membersDbService.ts";
import { MemberDb, MemberLegiscan } from "../models/member.ts";
import { getMemberDbFromDTO } from "../utils/memberUtils.ts";

const rolCallBaseUrl = Deno.env.get("CONGRESSIONAL_ROLL_CALL_VOTE_URL")!;
const congressApiKey = Deno.env.get("CONGRESSIONAL_API_KEY")!;

const legiscanUrl = Deno.env.get("LEGISCAN_URL")!
const legiscanKey = Deno.env.get("LEGISCAN_KEY")!


export class MembersService{


    billsService: BillsService;
    constructor(){
        this.billsService = new BillsService();
    }

    async createMembersFromLegiscan() {

        const memberIds = await MembersDbService.getMemberIds();

        



        // Create Members
        const members: MemberDb[][] = [];
        for (let idx = 0; idx < memberIds.length; idx++) {
            const memberId = memberIds[idx];
            const response = await fetch(`${legiscanUrl}/?key=${legiscanKey}&op=getPerson&id=${memberId}`);
            const { person, status }: { person?: MemberLegiscan, status: string, } = await response.json();
            if (!person || status.toLowerCase() !== 'ok'){
                console.error(`Error getting person with ID: ${memberId}. Status: ${status}`);
                continue;
            }
            const upsertedMembers = await MembersDbService.upsertMembers([getMemberDbFromDTO(person)])
            
            members.push(upsertedMembers);
        }

        return members.flat();

    }


}