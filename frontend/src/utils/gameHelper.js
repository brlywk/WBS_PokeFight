function getTypesForEffect(typeArr, typeEffects, effect) {
  let retArr = [];

  typeArr.forEach((t1) => {
    typeEffects.forEach((t2) => {
      if (t1 === t2.type) {
        retArr = retArr.concat(t2[effect]);
      }
    });
  });

  return [...new Set(retArr)];
}

// effects are:
// not_effective
// no_effect
// super_effective
export function getTypeEffectModifier(
  attackerTypes,
  defenderTypes,
  typeEffects,
) {
  const effectiveAgainst = getTypesForEffect(
    attackerTypes,
    typeEffects,
    "super_effective",
  );
  const noEffectAgainst = getTypesForEffect(
    attackerTypes,
    typeEffects,
    "no_effect",
  );
  const notEffectiveAgainst = getTypesForEffect(
    attackerTypes,
    typeEffects,
    "not_effective",
  );

  // probably not the right way to do this, but let's favor the player and say
  // that if the player's pokemon is effective against at least one opp type
  // we go with that!
  if (defenderTypes.some((t) => effectiveAgainst.includes(t))) {
    return 2;
  }

  if (defenderTypes.some((t) => notEffectiveAgainst.includes(t))) {
    return 0.5;
  }

  if (defenderTypes.some((t) => noEffectAgainst.includes(t))) {
    return 0;
  }

  // default case
  return 1;
}

// actions:
// attack
// defend
// special_attack
// special_defend
export function calculateDamageCaused(
  action1,
  pokemon1,
  action2,
  pokemon2,
  attackModifier,
  specialModifier,
) {
  // if we defend, we don't do damage
  if (action1.indexOf("defense") != -1) {
    return 0;
  }

  const defenseModifier = action2.indexOf("defense") != -1 ? 0.5 : 1;

  const damage = Math.floor(
    (pokemon1.stats.attack / pokemon2.stats.defense) *
      attackModifier *
      defenseModifier *
      specialModifier,
  );

  return damage;
}

export function createRoundInfo(
  round,
  playerAction,
  playerDamageTaken,
  opponentAction,
  opponentDamageTaken,
  playerHp,
  opponentHP,
) {
  return {
    round,
    player_one_action: playerAction,
    player_one_damage_taken: playerDamageTaken,
    player_two_action: opponentAction,
    player_two_damage_taken: opponentDamageTaken,
    player_one_hp_left: playerHp,
    player_two_hp_left: opponentHP,
  };
}
