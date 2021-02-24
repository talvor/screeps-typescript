const pickTarget = (targets: Source[] | ConstructionSite[]): Source | ConstructionSite => {
  return targets[Math.floor(Math.random() * targets.length)];
};

export const findClosestConstruction = (creep: Creep): ConstructionSite | null => {
  let target: ConstructionSite | null = creep.memory.targetConstruction
    ? Game.getObjectById(creep.memory.targetConstruction)
    : null;

  if (!target) {
    target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES) as ConstructionSite;
  }
  creep.memory.targetConstruction = target ? target.id : "";

  return target;
};

export const findClosestSource = (creep: Creep): Source | null => {
  let target: Source | null = creep.memory.targetSource ? Game.getObjectById(creep.memory.targetSource) : null;

  if (!target) {
    target = creep.pos.findClosestByPath(FIND_SOURCES) as Source;
  }
  creep.memory.targetSource = target ? target.id : "";

  return target;
};

export const findRandomSource = (creep: Creep): Source | null => {
  let target: Source | null = creep.memory.targetSource ? Game.getObjectById(creep.memory.targetSource) : null;

  if (!target) {
    target = pickTarget(creep.room.find(FIND_SOURCES)) as Source;
  }
  creep.memory.targetSource = target ? target.id : "";

  return target;
};
