import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';

function calculateDamage(attacker: Monster, defender: Monster) {
  const attack = attacker.attack;
  const defense = defender.defense;

  const damage = Math.max(0, attack - defense);

  return damage <= defense ? 1 : damage;
}

function battleAlgorithm(monsterA: Monster, monsterB: Monster): Monster {
  let currentAttacker = monsterA.speed >= monsterB.speed ? monsterA : monsterB;
  let secondMonster = currentAttacker === monsterA ? monsterB : monsterA;

  if (monsterA.speed === monsterB.speed) {
    currentAttacker = monsterA.attack > monsterB.attack ? monsterA : monsterB;
  }

  let winner = currentAttacker;

  while (monsterA.hp > 0 && monsterB.hp > 0) {
    const damage = calculateDamage(currentAttacker, secondMonster);
    if (secondMonster.hp - damage <= 0) {
      winner = currentAttacker;
      break;
    }
    secondMonster.hp -= damage;

    // Swap attacker and defender for the next turn
    const temp = currentAttacker;
    currentAttacker = secondMonster;
    secondMonster = temp;
  }

  return winner;
}

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const create = async (req: Request, res: Response): Promise<Response> => {
  const { monsterAId, monsterBId } = req.body;
  if (!monsterAId || !monsterBId) {
    return res.status(StatusCodes.BAD_REQUEST).send();
  }

  const monsterA = await Monster.query().findById(monsterAId);
  const monsterB = await Monster.query().findById(monsterBId);

  if (!monsterA || !monsterB) {
    return res.status(StatusCodes.BAD_REQUEST).send();
  }

  const winner = battleAlgorithm(monsterA, monsterB);

  const battle = await Battle.query().insert({
    monsterA: monsterAId,
    monsterB: monsterBId,
    winner: winner.id,
  });

  return res.status(StatusCodes.OK).json(battle);
};

export const BattleController = {
  list,
  create,
};
