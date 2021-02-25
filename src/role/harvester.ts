import { buildConstruction, harvestEnergy, transferEnergy } from "jobs";

export const roleHarvester = {
  run(creep: Creep): void {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
      creep.memory.targetSource = "";
      creep.say("🔄 harvest");
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
      creep.memory.targetSource = "";
      creep.say("⚡ transfer");
    }

    if (creep.memory.working) {
      if (!transferEnergy(creep)) {
        // Cannot transfer energy so lets build
        buildConstruction(creep);
      }
    } else {
      harvestEnergy(creep);
    }
  }
};
