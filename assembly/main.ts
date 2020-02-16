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

