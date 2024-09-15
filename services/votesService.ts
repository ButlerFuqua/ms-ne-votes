import "jsr:@std/dotenv/load";

import { BillLegiscanPopulated, RollCallLegiscan, RollCallVoteDTO } from "../models/index.ts";
import { BillsDbService } from "../persistance/billsDbService.ts";
import { BillsService } from "./billsService.ts";
import { isVoteRollCallXmlValid, getMinFiveDigitStringFromNumber, getRollCallDbFromBillLegiscanVoteItem, getRollCallVoteDbFromBillLegiscanVote,  } from "../utils/index.ts";
import { VotesDbService } from "../persistance/votesDbService.ts";
import { getBillDTOFromLegiscanBill } from "../utils/billUtils.ts";
import { RollCallDB, RollCallVoteDB } from "../models/vote.ts";
import _default from "npm:@supabase/postgrest-js@1.16.1";

const rolCallBaseUrl = Deno.env.get("CONGRESSIONAL_ROLL_CALL_VOTE_URL")!;
const congressApiKey = Deno.env.get("CONGRESSIONAL_API_KEY")!;

const legiscanUrl = Deno.env.get("LEGISCAN_URL")!
const legiscanKey = Deno.env.get("LEGISCAN_KEY")!


export class VotesService{


    billsService: BillsService;
    constructor(){
        this.billsService = new BillsService();
    }

    async createRollCallsFromLegiscanAndDb() {

        // Get bills from db
        const bills = await BillsDbService.searchBills();


        // Create Roll Calls
        const rollCalls: RollCallDB[][] = [];
        for (let idx = 0; idx < bills.length; idx++) {
            const bill = bills[idx];
            const response = await fetch(`${legiscanUrl}/?key=${legiscanKey}&op=getBill&id=${bill.legiscan_bill_id}`);
            const { bill: populatedBill }: { bill: BillLegiscanPopulated } = await response.json();
            // console.log('populatedBill', populatedBill)
            if(populatedBill.votes.length < 1){
                continue;
            }

            if(!populatedBill.bill_id){
                throw new Error(`No bill_id found`)
            }
            const upsertedRollCalls = await VotesDbService.upsertRollCalls(populatedBill.votes.map(rollCall => getRollCallDbFromBillLegiscanVoteItem({...rollCall, bill_id: populatedBill.bill_id})))
            
            rollCalls.push(upsertedRollCalls);
        }

        return rollCalls.flat();

    }

    async createVotesFromLegiscanAndDb() {

        // Get bills from db
        const rollCalls: RollCallDB[] = await VotesDbService.searchRollCalls();

        // Create Roll Call Votes
        const votes: RollCallVoteDB[][] = [];
        for (let idx = 0; idx < rollCalls.length; idx++) {
            const rollCall = rollCalls[idx];
            const response = await fetch(`${legiscanUrl}/?key=${legiscanKey}&op=getRollCall&id=${rollCall.legiscan_roll_call_id}`);

            const responseBody: { roll_call?: RollCallLegiscan, status: string, alert: any } = await response.json();
            if (responseBody.status.toLowerCase() !== "ok" ){
                continue;
            }
            // console.log('responseBody', responseBody)
            const { roll_call: populatedRollCall } = responseBody;
            if (! populatedRollCall || populatedRollCall?.votes.length < 1){
                continue;
            }
            const upsertedRollCallVotes = await VotesDbService.upsertRollCallVotes(populatedRollCall.votes.map(vote => getRollCallVoteDbFromBillLegiscanVote({
                ...vote,
                legiscan_bill_id: populatedRollCall.bill_id,
                legiscan_roll_call_id: populatedRollCall.roll_call_id
            })))
            
            votes.push(upsertedRollCallVotes);
        }

        return votes.flat();

    }


}