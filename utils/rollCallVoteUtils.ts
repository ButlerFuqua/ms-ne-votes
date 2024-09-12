import { RollCallVoteDTO } from "../models/vote.ts";

export const isVoteRollCallXmlValid = (xmlString: string) => !xmlString.toLowerCase().includes('roll call vote unavailable');

export const getPrimaryKeyFromRolLCallVoteDTO = ({ vote_number, congress, session }: RollCallVoteDTO): string => `${vote_number}-${congress}-${session}`;