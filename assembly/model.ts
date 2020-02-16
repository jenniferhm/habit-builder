//@nearfile

export class TextMessage {
    text: string;
}

export class NewGoal {
    challenge_id: string;
    challenge_start_date: string;
    challenge_end_date: string;
    user_id: string;
    support_user_id: string;
    user_contribution: u64;
    support_user_contribution: u64;
    task_description: string;
    day: {
        [key: string]: Day,
    };
    is_complete: boolean;
    challenge_won: boolean;
}

export class Challenges {
    [key: string]: NewGoal;
}

class Day {
    participant: boolean;
    supporter: boolean;
}