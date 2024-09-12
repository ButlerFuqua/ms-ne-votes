import { Bill, BillCongress, BillDb, BillDbCongressDTO, BillDbLegiscanDTO, BillLegiscan } from "../models/bill.ts"

export const getBillFromDbBillType = (billDb: BillDb) : Bill =>({
    ...billDb
});

export const getBillDTOFromLegiscanBill = (bill: BillLegiscan): BillDbLegiscanDTO => ({
    title: bill.title,
    number: bill.number,
    legiscan_bill_id: bill.bill_id,
    legiscan_change_hash: bill.change_hash,
    legiscan_url: bill.url,
    legiscan_status_date: bill.status_date,
    legiscan_status: bill.status,
    legiscan_last_action_date: bill.last_action_date,
    legiscan_last_action: bill.last_action,
    description: bill.description,
})

export const getBillDbFromCongressBill = (congressBill: BillCongress): BillDbCongressDTO =>({
    congress: congressBill.congress,
    number: congressBill.number,
    title: congressBill.title,
    latest_action_date: congressBill.latestAction?.actionDate,
    latest_action_time: congressBill.latestAction?.actionTime,
    latest_action_text: congressBill.latestAction?.text,
    origin_chamber: congressBill.originChamber,
    origin_chamber_code: congressBill.originChamberCode,
    type: congressBill.type,
    update_date: congressBill.updateDate,
    update_date_including_text: congressBill.updateDateIncludingText,
    congress_gov_url: congressBill.url,
});