import { storage, logging } from "near-runtime-ts";
// available class: near, context, storage, logging, base58, base64, 
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { TextMessage } from "./model";
import moment = require("moment");

const NAME = ". Welcome to NEAR Protocol chain"

export function welcome(account_id: string): TextMessage {
  logging.log("simple welcome test");
  let message = new TextMessage()
  const s = printString(NAME);
  message.text = "Welcome, " + account_id + s;
  return message;
}

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
  let challengeStart = challenges[challengeId]['challenge_start_date'];
  let challengeUserId = challenges[challengeId]['user_id'];

  // if the current user is the challenge creator
  // then mark participation for this day and write it back to the chain
  if (userId === challengeUserId) {
    let challengeDay = dateDiffInDays(challengeStart);
    challenges[challengeId]['day'][challengeDay]['participant'] = true;
    storage.set('challenges', challenges);
  }
}

export function distributeTokens(): string {
  let result = storage.get<object>("challenges");

  if(result) {
    return result;
  }

  return "";
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
          "days_out_of_30": 10,
          "validation_logic": "some javascript logics to plugin",
          "is_fail": true,
          "is_success": false
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