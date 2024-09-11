import { BillsService } from "./billsService.ts";


export class VotesService{


    billsService: BillsService;
    constructor(){
        this.billsService = new BillsService();
    }

    searchAll(){
        return [
            {
                id: 3,
                title: "This is the title of the vote",
                description: "This is the description to the vote. It is a good vote. Please don't read the fine print. Just vote yest. Do it."
            }
        ]
    }

    async createAndStoreVotes(){
        const bills = await this.billsService.createBills();


        // Get all bills
        // for each 
 
        return bills
    }
}