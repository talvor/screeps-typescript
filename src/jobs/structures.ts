import { findClosestConstruction, findRepairStructure } from "utils/findTargets";

export const buildConstruction = (creep: Creep): boolean => {
  const target = findClosestConstruction(creep);
  if (target) {
    if (creep.build(target) === ERR_NOT_IN_RANGE) {
      creep.say("🔨 build");
      creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
    }
    return true;
  }
  return false;
};

export const repairStructure = (creep: Creep): boolean => {
  const target = findRepairStructure(creep);
  if (target) {
    if (creep.repair(target) === ERR_NOT_IN_RANGE) {
      creep.say("🚧 repair");
      creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
    }
    return true;
  }
  return false;
};

export const upgradeController = (creep: Creep): boolean => {
  if (creep.room.controller && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
    creep.say("🚧 upgrade controller");
    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: "#ffffff" } });
    return true;
  }

  return false;
};
