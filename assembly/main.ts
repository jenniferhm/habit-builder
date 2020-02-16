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