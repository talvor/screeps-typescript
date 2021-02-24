import { findClosestConstruction, findRandomSource } from "../utils/findTargets";

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
      const target = findClosestConstruction(creep);

      if (target) {
        if (creep.build(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    } else {
      const source = findRandomSource(creep);
      if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};
