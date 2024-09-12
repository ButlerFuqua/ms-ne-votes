import "jsr:@std/dotenv/load";

import { BillLegiscanPopulated, BillLegiscanVoteItem, RollCallVoteDTO } from "../models/index.ts";
import { BillsDbService } from "../persistance/billsDbService.ts";
import { BillsService } from "./billsService.ts";
import { isVoteRollCallXmlValid, getMinFiveDigitStringFromNumber, getRollCallVoteDbFromBillLegiscanVoteItem,  } from "../utils/index.ts";
import { VotesDbService } from "../persistance/votesDbService.ts";
import { getBillDTOFromLegiscanBill } from "../utils/billUtils.ts";
import { RollCallVoteDB } from "../models/vote.ts";

const rolCallBaseUrl = Deno.env.get("CONGRESSIONAL_ROLL_CALL_VOTE_URL")!;
const congressApiKey = Deno.env.get("CONGRESSIONAL_API_KEY")!;

const legiscanUrl = Deno.env.get("LEGISCAN_URL")!
const legiscanKey = Deno.env.get("LEGISCAN_KEY")!


export class VotesService{


    billsService: BillsService;
    constructor(){
        this.billsService = new BillsService();
    }

    async createVotesFromLegiscanAndDb() {

        // Get bills from db
        const bills = await BillsDbService.searchBills();

        const votes: RollCallVoteDB[][] = [];
        for (let idx = 0; idx < bills.length; idx++) {
            const bill = bills[idx];
            const response = await fetch(`${legiscanUrl}/?key=${legiscanKey}&op=getBill&id=${bill.legiscan_bill_id}`);
            const { bill: populatedBill }: { bill: BillLegiscanPopulated } = await response.json();
            const upsertedRollCallVotes = await VotesDbService.upsertRollCalls(populatedBill.votes.map(vote => getRollCallVoteDbFromBillLegiscanVoteItem({ ...vote, legiscan_bill_id: bill.bill_id})))
            
            votes.push(upsertedRollCallVotes);
        }
        

        



        return votes;

        // TODO: Change to create votes

        /**
         * From Legiscan API
        
        {
    "status": "OK",
    "roll_call": {
        "roll_call_id": 2,
        "bill_id": 60721,
        "date": "2009-05-26",
        "desc": "AB 853 ARAMBULA  Assembly Third Reading",
        "yea": 47,
        "nay": 30,
        "nv": 3,
        "absent": 0,
        "total": 80,
        "passed": 1,
        "chamber": "A",
        "chamber_id": 19,
        "votes": [
            {
                "people_id": 1493,
                "vote_id": 2,
                "vote_text": "Nay"
            },
            ...
    ]
            ...
    }


         */


        // const bills: any[] = [];

        // for (let index = 0; index < temp_stateAbbreviations.length; index++) {
        //     const state = temp_stateAbbreviations[index];
        //     const response = await fetch(`${legiscanUrl}/?key=${legiscanKey}&op=getMasterList&state=${state}`);
        //     const { masterlist: masterList } = await response.json();
        //     delete masterList.session;
        //     bills.push(Object.keys(masterList).map(key => masterList[key]));
        //     console.log(masterList);
        // }

        // const upsertedBills = await BillsDbService.upsertBills(bills.flat().map(getBillDTOFromLegiscanBill));

        return [];

    }


}