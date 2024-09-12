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

export type BillLegiscan = {
    bill_id: number;
    number: string;
    change_hash: string;
    url: string;
    status_date: string;
    status: number;
    last_action_date: string;
    last_action: string;
    title: string;
    description: string;
}

export type BillDbCongressDTO = {
    id: string; // DB id
    congress: number;
    number: string;
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

export type BillDbLegiscanDTO = {
    id?: string; // DB id
    title?: string;
    number: string;
    legiscan_bill_id?: number;
    legiscan_change_hash?: string;
    legiscan_url?: string;
    legiscan_status_date?: string;
    legiscan_status?: number;
    legiscan_last_action_date?: string;
    legiscan_last_action?: string;
    description?: string;
    state_abbreviation?: string;
}

export type BillDb = BillDbLegiscanDTO & {
    id: string;
}

export type Bill = BillDb;