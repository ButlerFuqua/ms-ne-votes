import { MemberLegiscan, MemberDb } from "../models/index.ts";

export const getMemberPkFromDTO = ({ people_id }: MemberLegiscan) => `${people_id}`;

export const getMemberDbFromDTO = (member: MemberLegiscan): MemberDb => ({
    id: getMemberPkFromDTO(member),
    legiscan_people_id: member.people_id,
    legiscan_person_hash: member.person_hash,
    legiscan_party_id: member.party_id,
    legiscan_state_id: member.state_id,
    party: member.party,
    legiscan_role_id: member.role_id,
    role: member.role,
    name: member.name,
    first_name: member.first_name,
    middle_name: member.middle_name,
    last_name: member.last_name,
    suffix: member.suffix,
    nickname: member.nickname,
    district: member.district,
    ftm_eid: member.ftm_eid,
    votesmart_id: member.votesmart_id,
    opensecrets_id: member.opensecrets_id,
    knowwho_pid: member.knowwho_pid,
    ballotpedia: member.ballotpedia,
    bioguide_id: member.bioguide_id,
    committee_sponsor: member.committee_sponsor,
    legiscan_committee_id: member.committee_id,
    state_federal: member.state_federal,
})