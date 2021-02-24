// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  room?: string;
  working?: boolean;
  target?: string;
  targetSource?: string;
  targetConstruction?: string;
}

interface Memory {
  uuid: number;
  log: any;
  roles: CreepRole[]
}

interface CreepRole {
  name: string;
  bodyParts: BodyPartConstant[];
  target: number;
  counter: number;
}

interface Creep
// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
