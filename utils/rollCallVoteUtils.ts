import { BillLegiscanVoteItem, RollCallVoteDB } from "../models/index.ts";

export const getRollCallVotePkFromDTO = ({ roll_call_id }: BillLegiscanVoteItem) => `${roll_call_id}`;

export const isVoteRollCallXmlValid = (xmlString: string) => !xmlString.toLowerCase().includes('roll call vote unavailable');

export const getRollCallVoteDbFromBillLegiscanVoteItem = (vote: BillLegiscanVoteItem & { legiscan_bill_id: number }): RollCallVoteDB => ({
    id: getRollCallVotePkFromDTO(vote),
    legiscan_roll_call_id: vote.roll_call_id,
    date: vote.date,
    legiscan_desc: vote.desc,
    yea_count: vote.yea,
    nay_count: vote.nay,
    nv_count: vote.nv,
    absent: vote.absent,
    total: vote.total,
    passed: vote.passed,
    chamber: vote.chamber,
    legiscan_chamber_id: vote.chamber_id,
    legiscan_url: vote.url,
    legiscan_state_link: vote.state_link,
    legiscan_bill_id: vote.legiscan_bill_id,
})