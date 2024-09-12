import "jsr:@std/dotenv/load";

import { RollCallVoteDTO } from "../models/index.ts";
import { BillsDbService } from "../persistance/billsDbService.ts";
import { BillsService } from "./billsService.ts";
import { isVoteRollCallXmlValid, getMinFiveDigitStringFromNumber, getPrimaryKeyFromRolLCallVoteDTO } from "../utils/index.ts";
import { VotesDbService } from "../persistance/votesDbService.ts";
import { getBillDTOFromLegiscanBill } from "../utils/billUtils.ts";

const rolCallBaseUrl = Deno.env.get("CONGRESSIONAL_ROLL_CALL_VOTE_URL")!;
const congressApiKey = Deno.env.get("CONGRESSIONAL_API_KEY")!;




export class VotesService{


    billsService: BillsService;
    constructor(){
        this.billsService = new BillsService();
    }

    searchAll(){
        return BillsDbService.searchBills();
    }


}