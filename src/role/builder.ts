import { buildConstruction, harvestEnergy, repairStructure, upgradeController } from "../jobs";

export const roleBuilder = {
  run(creep: Creep): void {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
      creep.memory.targetSource = "";
      creep.memory.targetConstruction = "";
      creep.say("🔄 harvest");
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
      creep.memory.targetSource = "";
      creep.memory.targetConstruction = "";
      creep.say("🚧 build");
    }

    if (creep.memory.working) {
      if (!buildConstruction(creep)) {
        // Cannot build try repair
        if (!repairStructure(creep)) {
          // Cannot repair so upgrade
          upgradeController(creep);
        }
      }
    } else {
      harvestEnergy(creep);
    }
  }
};
