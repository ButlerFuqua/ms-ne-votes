import "jsr:@std/dotenv/load";
import { Bill, BillCongress } from "../models/bill.ts";
import { BillsDbService } from "../persistance/billsDbService.ts";
import { getBillFromDbBillType, getBillDbFromCongressBill, getBillDTOFromLegiscanBill } from "../utils/index.ts";

const legiscanUrl = Deno.env.get("LEGISCAN_URL")!
const legiscanKey = Deno.env.get("LEGISCAN_KEY")!

const stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export class BillsService{


    async createBillsFromCongressApi(){

        const response = await fetch("https://api.congress.gov/v3/bill/", {headers: {
            'x-api-key': Deno.env.get("CONGRESSIONAL_API_KEY")!
        }});
        const { bills }: {bills: BillCongress[]} = await response.json();

        const upsertedBills = await BillsDbService.upsertBills(bills.map(getBillDbFromCongressBill));


        return upsertedBills.map(getBillFromDbBillType);        

    }

    async createBillsFromLegiscanApi({states}: {states: string[]}) {

        const bills: any[] = [];

        const temp_stateAbbreviations = stateAbbreviations.filter(st => states.map(state => state.toLowerCase()).includes(st.toLowerCase()));
        for (let index = 0; index < temp_stateAbbreviations.length; index++) {
            const state = temp_stateAbbreviations[index];
            const response = await fetch(`${legiscanUrl}/?key=${legiscanKey}&op=getMasterList&state=${state}`);
            const { masterlist: masterList } = await response.json();
            delete masterList.session;
            bills.push(Object.keys(masterList).map(key => masterList[key]));
            console.log(masterList);
        }

        const upsertedBills = await BillsDbService.upsertBills(bills.flat().map(getBillDTOFromLegiscanBill));

        return upsertedBills;

    }

}