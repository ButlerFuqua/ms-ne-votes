export type RollCallLegiscan = {
    roll_call_id: number;
    bill_id: number;
    date: string;
    desc: string;
    yea: number;
    nay: number;
    nv: number;
    absent: number;
    total: number;
    passed: number;
    chamber: string;
    chamber_id: number;
    url: string;
    state_link: string;
    votes: RollCallVoteLegiscan[]
}

export type RollCallDTO = {
    id?: string;
    legiscan_bill_id: number;
    legiscan_roll_call_id: number;
    date?: Date;
    legiscan_desc?: string;
    yea_count?: number;
    nay_count?: number;
    nv_count?: number;
    absent?: number;
    total?: number;
    passed?: number;
    chamber?: string;
    legiscan_chamber_id?: number;
    legiscan_url?: string;
    legiscan_state_link?: string;

}

export type RollCallDB = RollCallDTO & {
    id: string;
}

export type RollCallVoteLegiscan = {
    people_id: number;
    vote_id: number;
    vote_text: string;
    

}

export type RollCallVoteDTO = {
    id?: string;
    legiscan_people_id: number;
    legiscan_vote_id: number;
    legiscan_vote_text: string;
    legiscan_bill_id: number;
}

export type RollCallVoteDB = RollCallVoteDTO & {
    id: string;
}