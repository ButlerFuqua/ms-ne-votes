import { RollCallDB, RollCallLegiscan, RollCallVoteDB } from "../models/index.ts";
import { RollCallVoteLegiscan } from "../models/vote.ts";
import { getDateFromDateString } from "./index.ts";

export const getRollCallPkFromDTO = ({ roll_call_id }: RollCallLegiscan) => `${roll_call_id}`;
export const getRollCallVotePkFromDTO = ({ vote_id, people_id }: RollCallVoteLegiscan) => `${vote_id}-${people_id}`;

export const isVoteRollCallXmlValid = (xmlString: string) => !xmlString.toLowerCase().includes('roll call vote unavailable');

export const getRollCallDbFromBillLegiscanVoteItem = (rollCall: RollCallLegiscan ): RollCallDB => ({
    id: getRollCallPkFromDTO(rollCall),
    legiscan_roll_call_id: rollCall.roll_call_id,
    date: getDateFromDateString(rollCall.date),
    legiscan_desc: rollCall.desc,
    yea_count: rollCall.yea,
    nay_count: rollCall.nay,
    nv_count: rollCall.nv,
    absent: rollCall.absent,
    total: rollCall.total,
    passed: rollCall.passed,
    chamber: rollCall.chamber,
    legiscan_chamber_id: rollCall.chamber_id,
    legiscan_url: rollCall.url,
    legiscan_state_link: rollCall.state_link,
    legiscan_bill_id: rollCall.bill_id,
});

export const getRollCallVoteDbFromBillLegiscanVote = (vote: RollCallVoteLegiscan & { legiscan_bill_id: number, legiscan_roll_call_id: number, } ): RollCallVoteDB => ({
    id: getRollCallVotePkFromDTO(vote),
    legiscan_people_id: vote.people_id,
    legiscan_vote_id: vote.vote_id,
    legiscan_vote_text: vote.vote_text,
    legiscan_bill_id: vote.legiscan_bill_id,
    legiscan_roll_call_id: vote.legiscan_roll_call_id,
});