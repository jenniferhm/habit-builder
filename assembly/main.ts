import { logging, storage } from "near-runtime-ts";
// available class: near, context, storage, logging, base58, base64, 
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { TextMessage, PersonalGoal } from "./model";

const NAME = ". Welcome to NEAR Protocol chain"

export function welcome(account_id: string): TextMessage {
  logging.log("simple welcome test");
  let message = new TextMessage()
  const s = printString(NAME);
  message.text = "Welcome, " + account_id + s;
  return message;
}

export function set30DayChallenge(person: string, name: string): PersonalGoal[] {
  logging.log('storing challenge');
  const personalGoal = create30DayEntry(person, name);

  const currentGoals: PersonalGoal[] = get30DayChallenges(person);
  currentGoals.push(personalGoal);

  storage.set<PersonalGoal[]>(person, currentGoals);
  return currentGoals;
}

export function get30DayChallenges(person: string='Joe Smith'): PersonalGoal[] {
  const results = storage.get<PersonalGoal[]>(person, [])!;
  return results;
}

function create30DayEntry(person: string, task: string): PersonalGoal {
  const goal: PersonalGoal = {
    person,
    task,
    dateStarted: 'YYYY-MM-DD',
  }

  return goal;
};

function printString(s: string): string {
  return s;
}