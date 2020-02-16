
import { logging, storage } from "near-runtime-ts";
// available class: near, context, storage, logging, base58, base64, 
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { TextMessage, NewGoal } from "./model";

const NAME = ". Welcome to NEAR Protocol chain"
let numberOfChallenges = 0;

export function welcome(account_id: string): TextMessage {
  logging.log("simple welcome test");
  let message = new TextMessage()
  const s = printString(NAME);
  message.text = "Welcome, " + account_id + s;
  return message;
}

export function setNewChallenge(user_id: string, task_description: string, challenge_id: string, challenge_start_date: string, challenge_end_date: string, support_user_id: string, user_contribution: u64, support_user_contribution: u64, day: {}, is_complete: boolean): NewGoal[] {
  logging.log('storing challenge');
  const NewGoal = createNewChallengeEntry(
    user_id,
    task_description,
    challenge_id,
    challenge_start_date,
    support_user_id,
    user_contribution,
    support_user_contribution
    );

  const currentGoals: NewGoal[] = getChallenges(user_id, false);
  currentGoals.push(NewGoal);

  storage.set<NewGoal[]>(user_id, currentGoals);
  return currentGoals;
}

export function getChallenges(user_id: string, is_complete?: boolean): NewGoal[] {
  let results = storage.get<NewGoal[]>(user_id, [])!;

  if (is_complete === false) {
    results.filter((obj: {}, idx) => results[idx].is_complete === false);
  }
  return results;
}

export function getCurrentChallengesForUser(user: string): NewGoal[] {
  const results = getChallenges(user, false);
  return results;
}

function createNewChallengeEntry(user_id: string, task_description: string, challenge_id: string, challenge_start_date: string, support_user_id: string, user_contribution: u64, support_user_contribution: u64): NewGoal {
  const goal: NewGoal = {
    user_id,
    task_description,
    challenge_id: `${numberOfChallenges += 1}`,
    challege_start_date: "YYYY-MM-DD",
    challege_end_date: "",
    support_user_id,
    user_contribution,
    support_user_contribution,
    day: {},
    is_complete: false
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

