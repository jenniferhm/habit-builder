
import { logging, storage } from "near-runtime-ts";
// available class: near, context, storage, logging, base58, base64, 
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { TextMessage, NewGoal } from "./model";
import moment = require("moment");

const NAME = ". Welcome to NEAR Protocol chain"
let numberOfChallenges = 0;

export function welcome(account_id: string): TextMessage {
  logging.log("simple welcome test");
  let message = new TextMessage()
  const s = printString(NAME);
  message.text = "Welcome, " + account_id + s;
  return message;
}

export function setNewChallenge(user: string, task: string, amountPledged: number, isComplete: bool): NewGoal[] {
  logging.log('storing challenge');
  const NewGoal = createNewChallengeEntry(user, task, amountPledged, isComplete);

  const currentGoals: NewGoal[] = getChallenges(user);
  currentGoals.push(NewGoal);

  storage.set<NewGoal[]>(user, currentGoals);
  return currentGoals;
}

export function getChallenges(user: string, isComplete?: bool): NewGoal[] {
  let results = storage.get<NewGoal[]>(user, [])!;

  if (isComplete === false) {
    results.filter((obj: {}, idx: number) => obj[idx].isComplete === false);
  }
  return results;
}

export function getCurrentChallengesForUser(user: string) {
  const results = getChallenges(user, false);
  return results;
}

// function isChallengeComplete(challengeId: number, currentNumberOfDays: number) {
//   const markedDays = storage.get<currentChallenge>;
//   if (currentNumberOfDays - markedDays < 5 && currentNumberOfDays < 30) {
//     return false;
//   } else {
//     if (currentNumberOfDays)
//   }
// }

function createNewChallengeEntry(user: string, task: string, amountPledged: number, isComplete: bool): NewGoal {
  const goal: NewGoal = {
    userId: user,
    challengeId: numberOfChallenges += 1,
    task,
    dateStarted: 'YYYYMMDD',
    amountPledged,
    isComplete
  }

  return goal;
};


function printString(s: string): string {
  return s;
}

export function store() {}

function dateDiffInDays(challengeStart: number): number {
  let currDate = moment();
  let diff = currDate.diff(challengeStart, 'days');
  return diff
}

export function markDailyChallengeComplete(challengeId: string, userId: string): void {
  // get the challenges
  let challenges = storage.get<object>('challenges');
  let challenge = challenges[challengeId];
  let challengeStart = challenge['challenge_start_date'];
  let challengeUserId = challenge['user_id'];

  // if the current user is the challenge creator
  // then mark participation for this day and write it back to the chain
  if (userId === challengeUserId) {
    let challengeDay = dateDiffInDays(challengeStart);
    challenge['day'][challengeDay.toString()]['participant'] = true;
    storage.set('challenges', challenges);
  }
}

// once a challenge is completed
// we want to initiate a transaction between users
// and then 

export function isChallengeComplete(challengeId: string, minCompletionsToWin = 25, maxMissesToLose = 5) {
  let challenges = storage.get<object>('challenges');
  let challenge = challenges[challengeId];

  let completions = 0;
  let challengeDays = challenge['days'];
  for (let day in challengeDays) {
    if (day['participant']) {
      completions++
    }
  }

  if (completions > minCompletionsToWin) {
    challenge['challenge_won'] = true;
    distributeTokens(challenge);
  }
}

function distributeTokens(challenge: object): void {
  let won = challenge['challenge_won'];
  let participantId = challenge['user_id'];
  let participantDono = challenge['user_contribution'];
  let supporterId = challenge['supporter_id'];
  let supporterDono = challenge['support_user_contribution'];
  if (won) {
    transferFunds(participantId, supporterId, supporterDono);
  } else {
    transferFunds(participantId, supporterId, participantDono);
  }
}

function transferFunds(recipient: string, donor: string, amount: number) {
  // move amount from donor to recipient
  // implement wallet logic
}


/*

{
  "challenges": {
    "1" : {
      "day": {
        "0": {
          "participant": true
        },
        "20": {
          "participant": true
        }
        ...
      }
    }
  }
}


{
  "user_id": 1,
    "user_name": "i_am_user_1",
      "past_challenges": [
        {
          "challenge_id": 1,
          "challege_start_date": "2020-01-01T01:37:56",
          "challege_end_date": "2020-01-05T01:37:56",
          "user_id": 1,
          "support_usesr_id": 3,
          "challenge_amount": 10.05,
          "task_description": "walk my dog",
          "day": {
            "0": {
              "participant" : true,
              "support": true
            }
          },
          "validation_logic": "some javascript logics to plugin"
        },
        {
          "challenge_id": 3,
          "challege_start_date": "2020-01-05T01:37:56",
          "challege_end_date": "2020-01-10T01:37:56",
          "user_id": 1,
          "support_usesr_id": 6,
          "challenge_amount": 5.05,
          "task_description": "walk my cat",
          "days_out_of_30": 30,
          "validation_logic": "some javascript logics to plugin",
          "is_fail": false,
          "is_success": true
        }
      ],
        "current_challenge": {
    "challenge_id": 6,
      "challege_start_date": "2020-01-01T01:37:56",
        "challege_end_date": "2020-01-05T01:37:56",
          "user_id": 1,
            "support_usesr_id": 3,
              "challenge_amount": 10.05,
                "task_description": "walk my dog",
                  "days_out_of_30": 10,
                    "validation_logic": "some javascript logics to plugin",
                      "is_fail": false,
                        "is_success": false
  },
  "wallet_balance": 1000.12
}

*/