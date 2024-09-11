export type Vote = {
    id: string;
}

export type RollCallVoteDTO = {
    id?: string;
    xml_string: string;
}


export type RollCallVoteDB = RollCallVoteDTO & {
    id: string;
}