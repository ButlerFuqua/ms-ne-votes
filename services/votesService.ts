import { BillsDbService } from "../persistance/billsDbService.ts";
import { BillsService } from "./billsService.ts";


export class VotesService{


    billsService: BillsService;
    constructor(){
        this.billsService = new BillsService();
    }

    searchAll(){
        return BillsDbService.searchBills();
    }

    async createAndStoreVotes(){
        const bills = await this.billsService.createBills();


        // Get all bills
        // for each 
 
        return bills
    }
}