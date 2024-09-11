import { Bill, BillCongress, BillDb, BillDbDTO } from "../models/bill.ts"

export const getBillFromDbBillType = (billDb: BillDb) : Bill =>({
    id: billDb.id,
    congress: billDb.congress,
    number: billDb.number,
    title: billDb.title,
    latestActionDate: billDb.latest_action_date,
    latestActionTime: billDb.latest_action_time,
    latestActionText: billDb.latest_action_text,
    originChamber: billDb.origin_chamber,
    originChamberCode: billDb.origin_chamber_code,
    type: billDb.type,
    updateDate: billDb.update_date,
    updateDateIncludingText: billDb.update_date_including_text,
    congressGovUrl: billDb.congress_gov_url,
});

export const getBillDbFromCongressBill = (congressBill: BillCongress): BillDbDTO =>({
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