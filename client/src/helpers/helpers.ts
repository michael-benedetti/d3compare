import {DetailedItem, DetailedItems} from "./interfaces";

export function startCase(stat: string) {
  const result = stat.replace(/([A-Z/])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const defaultDetailedItem: DetailedItem = {
  id: "missing",
  name: "missing",
  icon: "missing",
  displayColor: "missing",
  tooltipParams: "missing",
  requiredLevel: -1,
  itemLevel: -1,
  stackSizeMax: -1,
  accountBound: true,
  flavorText: "missing",
  typeName: "missing",
  type: {
    twoHanded: false,
    id: "missing",
  },
  armor: -1,
  attacksPerSecond: -1,
  minDamage: -1,
  maxDamage: -1,
  slots: "missing",
  attributes: {
    primary: [],
    secondary: [],
  },
  attributesHtml: {
    primary: [],
    secondary: [],
  },
  openSockets: -1,
  gems: [],
  set: {
    name: "",
    slug: "",
    description: "",
    descriptionHtml: "",
  },
  seasonRequiredToDrop: -1,
  isSeasonRequiredToDrop: false
};

export const defaultDetailedItems: DetailedItems = {
  head: defaultDetailedItem,
  bracers: defaultDetailedItem,
  feet: defaultDetailedItem,
  hands: defaultDetailedItem,
  leftFinger: defaultDetailedItem,
  legs: defaultDetailedItem,
  mainHand: defaultDetailedItem,
  neck: defaultDetailedItem,
  offHand: defaultDetailedItem,
  rightFinger: defaultDetailedItem,
  shoulders: defaultDetailedItem,
  torso: defaultDetailedItem,
  waist: defaultDetailedItem
};

export const getClassPortraitOffset = (clazz: string, gender: number) => {
  let y: number;
  switch (clazz) {
    case "barbarian":
      y = 0;
      break;
    case "demon-hunter":
      y = 66;
      break;
    case "monk":
      y = 132;
      break;
    case "witch-doctor":
      y = 198;
      break;
    case "wizard":
      y = 264;
      break;
    case "crusader":
      y = 330;
      break;
    case "necromancer":
      y = 396;
      break;
    default:
      y = 0;
  }
  return `${gender * 83}px -${y}px`;
};
