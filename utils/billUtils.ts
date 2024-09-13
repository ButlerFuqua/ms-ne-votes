import { Bill, BillCongress, BillDb, BillDbCongressDTO, BillDbLegiscanDTO, BillLegiscan } from "../models/bill.ts"
import { getDateFromDateString } from "./index.ts";


// bill_id is from legisacn
export const getBillDBIdFromDTOAndState = ({number, bill_id }: BillLegiscan, stateAbbreviation: string)  => `${bill_id}-${number}-${stateAbbreviation}`;

export const getBillFromDbBillType = (billDb: BillDb) : Bill =>({
    ...billDb
});

export const getBillDTOFromLegiscanBill = (bill: BillLegiscan & {state_abbreviation: string;}): BillDbLegiscanDTO => ({
    id: getBillDBIdFromDTOAndState(bill, bill.state_abbreviation),
    title: bill.title,
    number: bill.number,
    legiscan_bill_id: bill.bill_id,
    legiscan_change_hash: bill.change_hash,
    legiscan_url: bill.url,
    legiscan_status_date: getDateFromDateString(bill.status_date),
    legiscan_status: bill.status,
    legiscan_last_action_date: getDateFromDateString(bill.last_action_date),
    legiscan_last_action: bill.last_action,
    description: bill.description,
    state_abbreviation: bill.state_abbreviation
})

