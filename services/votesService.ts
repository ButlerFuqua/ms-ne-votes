import "jsr:@std/dotenv/load";

import { RollCallVoteDTO } from "../models/index.ts";
import { BillsDbService } from "../persistance/billsDbService.ts";
import { BillsService } from "./billsService.ts";
import { isVoteRollCallXmlValid, getMinFiveDigitStringFromNumber, getPrimaryKeyFromRolLCallVoteDTO } from "../utils/index.ts";
import { VotesDbService } from "../persistance/votesDbService.ts";
import { getBillDTOFromLegiscanBill } from "../utils/billUtils.ts";

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

        // TODO: Change to create votes

        
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