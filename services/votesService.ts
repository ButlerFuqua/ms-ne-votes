import "jsr:@std/dotenv/load";

import { RollCallVoteDTO } from "../models/index.ts";
import { BillsDbService } from "../persistance/billsDbService.ts";
import { BillsService } from "./billsService.ts";

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

    async createAndStoreVotes(){
        // const bills = await this.billsService.createBills();
        const bills = await this.billsService.searchBills();


        // Get all bills
        // for each bill, construct xml string

        const billXmlUrls = bills.map(({congress}) => `${rolCallBaseUrl}/vote${congress}1/vote_${congress}_1_00352.xml`);
        // await VotesDbService.upsertRollCalls()
        await this.getRollCallDTOsFromUrls(billXmlUrls);

 
        return billXmlUrls
    }

    async getRollCallDTOsFromUrls(xmlUrls: string[]): Promise<RollCallVoteDTO[]>{


        const xmlString = await fetch(xmlUrls[0], {
            headers: {
                'x-api-key': congressApiKey
            }
        });

        console.log(xmlString);

        

        return [];
    }

}