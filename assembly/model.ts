//@nearfile

export class TextMessage {
    text: string;
}

export class NewGoal {
    challenge_id: string;
    challege_start_date: string;
    challege_end_date: string;
    user_id: string;
    support_user_id: string;
    user_contribution: u64;
    support_user_contribution: u64;
    task_description: string;
    day: {};
    is_complete: boolean;
}