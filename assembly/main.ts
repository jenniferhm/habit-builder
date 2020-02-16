
import { logging, storage } from "near-runtime-ts";
// available class: near, context, storage, logging, base58, base64, 
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { TextMessage, NewGoal, Challenges } from "./model";
import moment from "moment";


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
    challenge_start_date: "YYYY-MM-DD",
    challenge_end_date: "",
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

export function markDailyChallengeComplete(challenge_id: string, userId: string): void {
  // get the challenges
  let challenges = storage.get<Challenges>('challenges') || ;
  let challenge = challenges[challenge_id];
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

export function isChallengeComplete(challenge_id: string, minCompletionsToWin = 25, maxMissesToLose = 5) {
  let challenges = storage.get<Challenges>('challenges') || {};
  let challenge = challenges![challenge_id];

  let completions = 0;
  let challengeDays = challenge['day'];
  for (let day in challengeDays) {
    if (challengeDays.day['participant']) {
      completions++
    }
  }

  if (completions > minCompletionsToWin) {
    challenge['challenge_won'] = true;
    distributeTokens(challenge);
  }
}

function distributeTokens(challenge: NewGoal): void {
  let won = challenge['challenge_won'];
  let participantId = challenge['user_id'];
  let participantDono = challenge['user_contribution'];
  let supporterId = challenge['support_user_id'];
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

