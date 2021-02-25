import { findClosestSource, findRandomSource } from "../utils/findTargets";

const harvestSource = (creep: Creep): boolean => {
  let target;
  if (creep.memory.role === "harvester") {
    target = findRandomSource(creep);
  } else {
    target = findClosestSource(creep);
  }

  if (target) {
    if (target && creep.harvest(target) === ERR_NOT_IN_RANGE) {
      creep.say("🔄 harvest");
      creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
    }
    return true;
  }
  return false;
};

const withdrawSource = (creep: Creep): boolean => {
  const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
  });

  if (target) {
    if (target && creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.say("🔄 withdraw");
      creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
    }
    return true;
  }
  return false;
};

export const harvestEnergy = (creep: Creep): boolean => {
  if (creep.memory.role === "harvester") {
    return harvestSource(creep);
  } else {
    return withdrawSource(creep) || harvestSource(creep);
  }
};

export const transferEnergy = (creep: Creep): boolean => {
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType === STRUCTURE_EXTENSION ||
          structure.structureType === STRUCTURE_SPAWN ||
          structure.structureType === STRUCTURE_TOWER) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      );
    }
  });
  const containers = creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return structure.structureType === STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }
  });
  if (targets.length > 0 && creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.say("⚡ transfer");
    creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
    return true;
  } else if (containers.length > 0 && creep.transfer(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.say("⚡ transfer containers");
    creep.moveTo(containers[0], { visualizePathStyle: { stroke: "#ffffff" } });
    return true;
  } else {
    return false;
  }
};
