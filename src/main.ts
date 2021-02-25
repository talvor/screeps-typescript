import { ErrorMapper } from "utils/ErrorMapper";

import { roleBuilder } from "./role/builder";
import { roleGuard } from "./role/guard";
import { roleHarvester } from "./role/harvester";
import { roleUpgrader } from "./role/upgrader";

if (!Memory.roles) {
  Memory.roles = [
    {
      name: "Harvester",
      target: 2,
      counter: 0,
      bodyParts: [WORK, CARRY, MOVE]
    },
    {
      name: "Builder",
      target: 0,
      counter: 0,
      bodyParts: [WORK, CARRY, MOVE]
    },
    {
      name: "Upgrader",
      target: 0,
      counter: 0,
      bodyParts: [WORK, CARRY, MOVE]
    },
    {
      name: "Guard",
      target: 0,
      counter: 0,
      bodyParts: [WORK, ATTACK, MOVE]
    }
  ];
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

const buildCost = (bodyParts: BodyPartConstant[]): number => {
  let cost = 0;

  bodyParts.forEach(part => {
    switch (part) {
      case MOVE:
        cost += 50;
        break;

      case WORK:
        cost += 100;
        break;

      case CARRY:
        cost += 50;
        break;

      case ATTACK:
        cost += 80;
        break;

      case RANGED_ATTACK:
        cost += 150;
        break;

      case HEAL:
        cost += 250;
        break;

      case CLAIM:
        cost += 600;
        break;

      default:
        break;
    }
  });

  return cost;
};
const spawnCreep = (role: CreepRole) => {
  if (!Game.spawns.Spawn1.spawning && Game.spawns.Spawn1.store.energy > buildCost(role.bodyParts)) {
    console.log(`Spawning ${role.name} creep.`);

    role.counter++;

    Game.spawns.Spawn1.spawnCreep(role.bodyParts, `${role.name}${role.counter}`, {
      memory: { role: role.name.toLowerCase() }
    });
  }
};

export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      console.log(`Missing creep ${name}`);
      delete Memory.creeps[name];
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    switch (creep.memory.role) {
      case "harvester":
        roleHarvester.run(creep);
        break;

      case "upgrader":
        roleUpgrader.run(creep);
        break;

      case "builder":
        roleBuilder.run(creep);
        break;

      case "guard":
        roleGuard.run(creep);
        break;

      default:
        break;
    }
  }

  // Spawn creeps
  Memory.roles.forEach(role => {
    const creeps = Game.spawns.Spawn1.room.find(FIND_CREEPS, {
      filter(object) {
        return object.memory.role === role.name.toLowerCase();
      }
    });

    if (creeps.length < role.target) {
      spawnCreep(role);
    }
  });
});
