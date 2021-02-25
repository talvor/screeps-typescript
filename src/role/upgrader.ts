import { harvestEnergy, upgradeController } from "jobs";
import { findRandomSource } from "../utils/findTargets";

export const roleUpgrader = {
  run(creep: Creep): void {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
      creep.memory.targetSource = "";
      creep.say("🔄 harvest");
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
      creep.memory.targetSource = "";
      creep.say("⚡ upgrade");
    }

    if (creep.memory.working) {
      upgradeController(creep);
    } else {
      harvestEnergy(creep);
    }
  }
};
