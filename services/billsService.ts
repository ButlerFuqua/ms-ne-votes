import "jsr:@std/dotenv/load";
import { Bill, BillCongress } from "../models/bill.ts";
import { BillsDbService } from "../persistance/billsDbService.ts";
import { getBillFromDbBillType, getBillDbFromCongressBill } from "../utils/index.ts";

export class BillsService{


    async createBills(){

        const response = await fetch("https://api.congress.gov/v3/bill/", {headers: {
            'x-api-key': Deno.env.get("CONGRESSIONAL_API_KEY")!
        }});
        const { bills }: {bills: BillCongress[]} = await response.json();

        const upsertedBills = await BillsDbService.upsertBills(bills.map(getBillDbFromCongressBill));


        return upsertedBills.map(getBillFromDbBillType);        

    }

    async searchBills(): Promise<Bill[]>{

        await BillsDbService.searchBills();
        

        return [];
    }

}