export interface AccessToken {
  accessToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface D3Repository {
  getProfile: (region: string, profile: string) => Promise<any>;
  getHero: (region: string, account: string, heroId: string) => Promise<any>;
  getDetailedItems: (region: string, account: string, heroId: string) => Promise<any>;
  getLeaderboard: (season: string, leaderboard: string) => Promise<any>;
}

export interface HeroIdentifier {
  region: string;
  account: string;
  heroId: string;
  key?: string;
}

export interface Kills {
  monsters?: number;
  elites?: number;
  hardcoreMonsters?: number;
}

export interface BasicHeroData {
  id: number;
  name: string;
  class: string;
  classSlug: string;
  gender: number;
  level: number;
  kills: Kills;
  paragonLevel: number;
  hardcore: boolean;
  seasonal: boolean;
  dead: boolean;
  "last-updated": number;
}

export interface BaseSkill {
  slug: string;
  name: string
  icon: string
  level: number;
  tooltipUrl: string
  description: string;
  descriptionHtml: string;
  flavorText?: string;
}

export interface Rune {
  slug: string;
  type: string;
  name: string;
  level: number;
  description: string;
  descriptionHtml: string;
}

export interface Skill {
  skill: BaseSkill;
  rune?: Rune;
}

export interface Skills {
  active: Skill[];
  passive: Skill[];
}

export interface DyeColor {
  id: string;
  name: string;
  icon: string;
  tooltipParams: string;
}

export interface Item {
  id: string;
  name: string;
  icon: string;
  displayColor: string;
  tooltipParams: string;
  dyeColor?: DyeColor;
  transmogItem?: Item;
}

export interface Items {
  head?: Item;
  neck?: Item;
  torso?: Item;
  shoulders?: Item;
  legs?: Item;
  waist?: Item;
  hands?: Item;
  bracers?: Item;
  feet?: Item;
  leftFinger?: Item;
  rightFinger?: Item;
  mainHand?: Item;
  offHand?: Item;
}

export interface GemItem {
  id: string;
  slug: string;
  name: string;
  icon: string;
  path: string;
}

export interface Gem {
  item: GemItem;
  attributes: string[];
  jewelRank?: number;
  jewelSecondaryUnlockRank?: number;
  isGem: boolean;
  isJewel: boolean;
}

interface SetData {
  "name": string;
  "slug": string;
  "description": string;
  "descriptionHtml": string;
}

export interface DetailedItem {
  id: string;
  name: string;
  icon: string;
  displayColor: string;
  tooltipParams: string;
  requiredLevel: number;
  itemLevel: number;
  stackSizeMax: number;
  accountBound: true;
  flavorText: string;
  typeName: string;
  type: {
    twoHanded: boolean;
    id: string;
  };
  armor: number;
  damage?: string;
  dps?: string;
  attacksPerSecond: number;
  minDamage: number;
  maxDamage: number;
  elementalType?: string;
  slots: string;
  attributes: {
    primary: string[];
    secondary: string[];
  };
  attributesHtml: {
    primary: string[];
    secondary: string[];
  };
  openSockets: number;
  gems: Gem[];
  set: SetData;
  seasonRequiredToDrop: number;
  isSeasonRequiredToDrop: boolean;
}

export interface DetailedItems {
  head: DetailedItem;
  neck: DetailedItem;
  torso: DetailedItem;
  shoulders: DetailedItem;
  legs: DetailedItem;
  waist: DetailedItem;
  hands: DetailedItem;
  bracers: DetailedItem;
  feet: DetailedItem;
  leftFinger: DetailedItem;
  rightFinger: DetailedItem;
  mainHand: DetailedItem;
  offHand: DetailedItem;

}

export interface LegendaryPower {
  id: string;
  name: string;
  icon: string;
  displayColor: string;
  tooltipParams: string;
}

export interface HoverStat {
  stat: string;
  statValue: string;
  heroIndex: number;
}

export interface Stats {
  life: number;
  damage: number;
  toughness: number;
  healing: number;
  attackSpeed: number;
  armor: number;
  strength: number;
  dexterity: number;
  vitality: number;
  intelligence: number;
  physicalResist: number;
  fireResist: number;
  coldResist: number;
  lightningResist: number;
  poisonResist: number;
  arcaneResist: number;
  blockChance: number;
  blockAmountMin: number;
  blockAmountMax: number;
  goldFind: number;
  critChance: number;
  thorns: number;
  lifeSteal: number;
  lifePerKill: number;
  lifeOnHit: number;
  primaryResource: number;
  secondaryResource: number;
}

export interface DetailedHeroData {
  code?: string;
  reason?: string;
  id: number;
  name: string;
  class: string;
  gender: number;
  level: number;
  paragonLevel: number;
  kills: Kills;
  hardcore: boolean;
  seasonal: boolean;
  seasonCreated: number;
  skills: Skills;
  items: Items;
  followers: any;
  legendaryPowers: LegendaryPower[];
  progression: any;
  alive: boolean;
  lastUpdated: number;
  highestSoloRiftCompleted: number;
  stats: Stats;
}

export interface TimePlayed {
  "demon-hunter": number;
  barbarian: number;
  "witch-doctor": number;
  necromancer: number;
  wizard: number;
  monk: number;
  crusader: number;
}

export interface Progression {
  act1: boolean;
  act3: boolean;
  act2: boolean;
  act5: boolean;
  act4: boolean;
}

export interface Merchant {
  slug: string;
  level: number;
}

export interface Profile {
  battleTag: string;
  paragonLevel?: number;
  paragonLevelHardcore?: number;
  paragonLevelSeason?: number;
  paragonLevelSeasonHardcore?: number;
  guildName?: string;
  heroes?: BasicHeroData[];
  lastHeroPlayed?: number;
  lastUpdated?: number;
  kills?: Kills;
  highestHardcoreLevel?: number;
  timePlayed?: TimePlayed;
  progression?: Progression;
  seasonalProfiles?: any;
  jeweler?: Merchant;
  mystic?: Merchant;
  blacksmith?: Merchant;
  blacksmithSeason?: Merchant;
  jewelerSeason?: Merchant;
  mysticSeason?: Merchant;
  blacksmithHardcore?: Merchant;
  jewelerHardcore?: Merchant;
  mysticHardcore?: Merchant;
  blacksmithSeasonHardcore?: Merchant;
  jewelerSeasonHardcore?: Merchant;
  mysticSeasonHardcore?: Merchant;
}

export interface Player {
  key: string;
  accountId: number;
  data: any[]
}

export interface Leader {
  player: Player[];
  order: number;
  data: LeaderData[];
}

export interface LeaderData {
  id: string,
  number?: number,
  string?: string,
}

export interface Leaderboard {
  links: any;
  row: Leader[];
}