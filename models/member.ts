export type MemberLegiscan = {
    people_id: number;
    person_hash: string;
    party_id: string;
    state_id: number;
    party: string;
    role_id: number;
    role: string;
    name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    nickname: string;
    district: string;
    ftm_eid: number;
    votesmart_id: number;
    opensecrets_id: string;
    knowwho_pid: number;
    ballotpedia: string;
    bioguide_id: string;
    committee_sponsor: number;
    committee_id: number;
    state_federal: number;
}

export type MemberDb = {
    id: string;
    legiscan_people_id: number;
    legiscan_person_hash: string;
    legiscan_party_id: string;
    legiscan_state_id: number;
    party: string;
    legiscan_role_id: number;
    role: string;
    name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    nickname: string;
    district: string;
    ftm_eid: number;
    votesmart_id: number;
    opensecrets_id: string;
    knowwho_pid: number;
    ballotpedia: string;
    bioguide_id: string;
    committee_sponsor: number;
    legiscan_committee_id: number;
    state_federal: number;
}