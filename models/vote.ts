export type Vote = {
    id: string;
}

export type RollCallVoteDTO = {
    id?: string;
    congress: number;
    xml_string: string;
    vote_number: string;
    session: number;
}


export type RollCallVoteDB = RollCallVoteDTO & {
    id: string;
}