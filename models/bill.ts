export type BillCongress = {
    congress: number;
    number: string;
    title?: string;
    latestAction?: {
        actionDate?: string;
        actionTime?: string;
        text?: string;
    },
    originChamber?: string;
    originChamberCode?: string;
    type?: string;
    updateDate?: string;
    updateDateIncludingText?: string;
    url?: string;
}

export type BillDbDTO = {
    congress: number;
    number: string;
    id?: string;
    title?: string;
    latest_action_date?: string;
    latest_action_time?: string;
    latest_action_text?: string;
    origin_chamber?: string;
    origin_chamber_code?: string;
    type?: string;
    update_date?: string;
    update_date_including_text?: string;
    congress_gov_url?: string;
}

export type BillDb = BillDbDTO & {
    id: string;
}

export type Bill = {
    id: string;
    congress: number;
    number: string;
    title?: string;
    latestActionDate?: string;
    latestActionTime?: string;
    latestActionText?: string;
    originChamber?: string;
    originChamberCode?: string;
    type?: string;
    updateDate?: string;
    updateDateIncludingText?: string;
    congressGovUrl?: string;
}