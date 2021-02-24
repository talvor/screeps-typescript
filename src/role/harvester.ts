import { findRandomSource } from "../utils/findTargets";

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
          return (
            structure.structureType === STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      } else if (containers.length > 0) {
        if (creep.transfer(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(containers[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      } else {
        // Just move back to spawn
        const spawn = creep.room.find(FIND_STRUCTURES, {
          filter: structure => structure.structureType === STRUCTURE_SPAWN
        });

        if (spawn.length > 0) {
          creep.moveTo(spawn[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    } else {
      const target = findRandomSource(creep);

      if (target && creep.harvest(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};
