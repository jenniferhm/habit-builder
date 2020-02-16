//@nearfile

export class TextMessage {
    text: string;
}

export class NewGoal {
    userId: string;
    challengeId: number;
    task: string;
    dateStarted: string;
    amountPledged: number;
    isComplete: bool;
}