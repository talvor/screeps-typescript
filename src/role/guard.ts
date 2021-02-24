export const roleGuard = {
  run(creep: Creep): void {
    const targets = creep.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      if (creep.attack(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
      }
    } else {
      const flags = creep.room.find(FIND_FLAGS);
      if (flags[0]) {
        creep.moveTo(flags[0]);
      }
    }
  }
};
