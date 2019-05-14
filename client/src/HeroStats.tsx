import Card from "@material-ui/core/Card";
import * as React from "react";
import {
  DetailedHeroData, DetailedItems, Gem,
  OrganizedStatsDefense, OrganizedStatsGeneric,
  OrganizedStatsLife, OrganizedStatsOffense, OrganizedStatsPrimary,
  Stats
} from "./helpers/interfaces";
import {useContext} from "react";
import {AppContext} from "./App";
import './css/HeroStats.css';
import {startCase} from "./helpers/helpers";
import uniqid = require('uniqid');
import {useEffect, useState} from "react";

interface HeroStatsProps {
  hero: DetailedHeroData;
  detailedItems: DetailedItems;
  heroIndex: number;
}

function HeroStats(props: HeroStatsProps) {
  const appContext = useContext(AppContext);
  const [organizedStats, setOrganizedStats] = useState<OrganizedStatsGeneric[]>([]);
  const percentageStats = [
    "goldFind",
    "criticalHitChance",
    "criticalHitDamage",
    "blockChance",
    "attackSpeedIncrease",
    "eliteDamageReduction",
    "cooldownReduction",
    "dmgIncreasedByPrimary",
    "bonusDamageToElites",
    "areaDamage",
  ];

  useEffect(() => {
    setOrganizedStats(organizeStats(props.hero.stats));
  }, [props.detailedItems]);

  function calculateStats() {
    const result = {
      dmgIncreasedByPrimary: calculateDamageIncrease(),
      bonusDamageToElites: 0,
      // attacksPerSecond: 0,
      // attackSpeedIncrease: 0,
      criticalHitChance: 0,
      criticalHitDamage: 0,
      areaDamage: 0,
      cooldownReduction: 0,
      resistanceToAllElements: 0,
      eliteDamageReduciton: 0,
      lifePerHit: 0,
      thorns: 0,
    };

    function calculateDamageIncrease() {
      switch (props.hero.class) {
        case "wizard":
        case "necromancer":
        case "witch-doctor":
          return props.hero.stats.intelligence / 100;
        case "barbarian":
        case "crusader":
          return props.hero.stats.strength / 100;
        case "demon-hunter":
        case "monk":
          return props.hero.stats.dexterity / 100;
        default:
          return 0;
      }
    }

    function calculateAdditiveStats(attributes: string[], multiplier: number = 1) {
      attributes &&
      attributes.forEach((attribute) => {
        const attributeLower = attribute.toLowerCase();
        if (attributeLower.includes("critical hit damage")) {
          result.criticalHitDamage += (parseFloat(attributeLower.match(/\d+(\.\d+)?/g)![0]) / 100) * multiplier;
        } else if (attributeLower.includes("critical hit chance")) {
          result.criticalHitChance += (parseFloat(attributeLower.match(/\d+(\.\d+)?/g)![0]) / 100) * multiplier;
        } else if (attributeLower.includes("reduces cooldown")) {
          result.cooldownReduction += (parseFloat(attributeLower.match(/\d+(\.\d+)?/g)![0]) / 100) * multiplier;
        } else if (attributeLower.includes("area damage on hit")) {
          result.areaDamage += (parseFloat(attributeLower.match(/\d+(\.\d+)?/g)![0]) / 100) * multiplier;
        } else if (attributeLower.includes("reduces damage from elites")) {
          result.eliteDamageReduciton += (parseFloat(attributeLower.match(/\d+(\.\d+)?/g)![0]) / 100) * multiplier;
        } else if (attributeLower.includes("increases damage against elites")) {
          result.bonusDamageToElites += (parseFloat(attributeLower.match(/\d+(\.\d+)?/g)![0]) / 100) * multiplier;
          // } else if (attributeLower.includes("Increases attack speed")) {
          //   result.attackSpeedIncrease (+= parseInt(attributeLower.match(/\d+(\.\d+)?/g)![0]) / 100) * multiplier;
        } else if (attributeLower.includes("resistance to all elements")) {
          result.resistanceToAllElements += (parseInt(attributeLower.match(/\d+(\.\d+)?/g)![0])) * multiplier;
        } else if (attributeLower.includes("life per hit")) {
          result.lifePerHit += (parseInt(attributeLower.match(/\d+(\.\d+)?/g)![0])) * multiplier;
        } else if (attributeLower.includes("thorns damage")) {
          result.thorns += (parseInt(attributeLower.match(/\d+(\.\d+)?/g)![0])) * multiplier;
        }
      });
    }

    function processJewel(attributes: string[]) {
      const jewelName = attributes[0].split(" - ")[0];
      let regExp;
      let match;

      switch (jewelName) {
        case "Boyarsky's Chip":
          regExp = /Adds ([0-9,]+) Thorns/g;
          match = regExp.exec(attributes[0]);
          if (match && match[1]) result.thorns += parseInt(match[1].replace(",", ""));
          break;
        case "Bane of the Powerful":
          regExp = /Rank ([0-9]+)/g;
          match = regExp.exec(attributes[0]);
          if (match && match[1] && parseInt(match[1]) >= 25) {
            result.bonusDamageToElites += .15;
            result.eliteDamageReduciton += .15;
          }
          break;
      }
    }

    Object.keys(props.detailedItems).forEach((item) => {
      props.detailedItems[item].gems && props.detailedItems[item].gems.forEach((gem: Gem) => {
        if (gem.isJewel) processJewel(gem.attributes);
        else calculateAdditiveStats(gem.attributes, props.detailedItems[item].name === "Leoric's Crown"
        || props.hero.legendaryPowers && props.hero.legendaryPowers[1] && props.hero.legendaryPowers[1].name === "Leoric's Crown" ? 2 : 1);
      });
      calculateAdditiveStats(props.detailedItems[item].attributes.primary);
      calculateAdditiveStats(props.detailedItems[item].attributes.secondary);
    });

    return result;
  }

  function organizeStats(stats: Stats): OrganizedStatsGeneric[] {
    const calculatedStats = calculateStats();
    const primary: OrganizedStatsPrimary = {
      highestSoloRiftCompleted: props.hero.highestSoloRiftCompleted,
      strength: stats.strength,
      dexterity: stats.dexterity,
      intelligence: stats.intelligence,
      vitality: stats.vitality,
      damage: stats.damage,
      toughness: stats.toughness,
      recovery: stats.healing,

    };

    const offense: OrganizedStatsOffense = {
      dmgIncreasedByPrimary: calculatedStats.dmgIncreasedByPrimary,
      bonusDamageToElites: calculatedStats.bonusDamageToElites,
      // attacksPerSecond: -1,
      attackSpeedIncrease: stats.attackSpeed,
      criticalHitChance: calculatedStats.criticalHitChance,
      criticalHitDamage: calculatedStats.criticalHitDamage,
      areaDamage: calculatedStats.areaDamage,
      cooldownReduction: calculatedStats.cooldownReduction,
    };

    const defense: OrganizedStatsDefense = {
      armor: stats.armor + stats.strength + stats.dexterity,
      blockAmountMin: stats.blockAmountMin,
      blockAmountMax: stats.blockAmountMax,
      blockChance: stats.blockChance,
      // dodgeChance: -1,
      physicalResistance: stats.physicalResist + calculatedStats.resistanceToAllElements + (stats.intelligence / 10),
      coldResistance: stats.coldResist + calculatedStats.resistanceToAllElements + (stats.intelligence / 10),
      fireResistance: stats.fireResist + calculatedStats.resistanceToAllElements + (stats.intelligence / 10),
      lightningResistance: stats.fireResist + calculatedStats.resistanceToAllElements + (stats.intelligence / 10),
      poisonResistance: stats.poisonResist + calculatedStats.resistanceToAllElements + (stats.intelligence / 10),
      "arcane/HolyResistance": stats.arcaneResist + calculatedStats.resistanceToAllElements + (stats.intelligence / 10),
      // crowdControlReduction: 0,
      // missileDamageReduction: 0,
      // meleeDamageReduction: 0,
      eliteDamageReduction: calculatedStats.eliteDamageReduciton,
      thorns: calculatedStats.thorns,
    };

    const life: OrganizedStatsLife = {
      life: stats.life,
      // totalLifeBonus: 0,
      // lifePerSecond: 0,
      lifePerHit: stats.lifeOnHit + calculatedStats.lifePerHit,
      lifePerKill: stats.lifePerKill,
      lifeSteal: stats.lifeSteal,
      // healthGlobeHealingBonus: 0,
      // bonusToGoldGlobeRadius: 0,
    };

    return [
      {name: "Primary", object: primary},
      {name: "Offense", object: offense},
      {name: "Defense", object: defense},
      {name: "Life", object: life}
    ];
  }

  function determineStyles(stat: string, stats: Object) {
    const styles = [];
    if (appContext.hoveredStat.stat === stat) {
      styles.push({fontWeight: "bold"});
      if (appContext.hoveredStat.heroIndex === props.heroIndex) {
        styles.push({color: "black", backgroundColor: "#ccc"});
      } else if (appContext.hoveredStat.statValue > stats[stat]) {
        styles.push({color: "red"});
      } else if (appContext.hoveredStat.statValue === stats[stat]) {
        styles.push({color: "black"});
      } else if (appContext.hoveredStat.statValue < stats[stat]) {
        styles.push({color: "#00ff22"});
      }
    } else {
      styles.push({color: "white"});
    }
    return Object.assign({display: "flex", justifyContent: "space-between"}, ...styles);
  }

  function processStat(stat: string, stats: Object) {
    return percentageStats.indexOf(stat) > -1
      ? `${(stats[stat] * 100).toFixed(2)}%`.replace(".00", "")
      : stats[stat].toLocaleString();
  }

  return (
    <Card className={"Stats"}>
      {organizedStats.map((section) => {
        return (
          <div key={uniqid.process()}>
            <div style={{
              fontFamily: "exocet-blizzard-light",
              fontSize: "18px",
              justifyContent: "center",
              marginTop: "15px"
            }}>
              {section.name}
            </div>
            <hr/>
            {section && Object.keys(section.object).map((stat: string) => {
              return (
                <div
                  key={uniqid.process()}
                  onMouseEnter={() => appContext.setSelectedStat({
                    stat,
                    statValue: section.object[stat],
                    heroIndex: props.heroIndex
                  })}
                  style={determineStyles(stat, section.object)}
                >
                  <div>{startCase(stat)}</div>
                  <div>{processStat(stat, section.object)}</div>
                </div>
              )
            })}
          </div>
        )
      })}
    </Card>
  )
}

export default HeroStats