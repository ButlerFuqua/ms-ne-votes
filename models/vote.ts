export type Vote = {
    id: string;
}

export type RollCallVoteDTO = {
    id?: string;
    legiscan_bill_id: number;
    legiscan_roll_call_id: number;
    date?: string;
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
    

    session?: number;
}


export type RollCallVoteDB = RollCallVoteDTO & {
    id: string;
}