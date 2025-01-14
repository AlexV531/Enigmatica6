onEvent('server.datapack.high_priority', (event) => {
    if (global.isExpertMode == false) {
        return;
    }
    const errorKey_prefix = 'gamestage.enigmatica.restrictions.';

    let restrictions = [
        // Soul Enchanter only usable in the nether after crafting a Hellfire Forge
        {
            type: 'and',
            name: 'eidolon:soul_enchanter',
            block: true,
            first: { type: 'dimension', dimension: 'minecraft:the_nether' },
            second: { type: 'gamestage', stage: 'hellfire_forge' },
            errorKey: `${errorKey_prefix}hellfire_forge`
        }
    ];

    // Requires creation of Red Chalk to place outside of Atum
    let restricted_occultism_items = ['occultism:chalk_purple', 'occultism:chalk_gold', 'occultism:chalk_white'];
    restricted_occultism_items.forEach((item) => {
        restrictions.push({
            type: 'or',
            name: item,
            item: true,
            first: { type: 'dimension', dimension: 'atum:atum' },
            second: { type: 'gamestage', stage: 'red_chalk' },
            errorKey: `${errorKey_prefix}red_chalk`
        });
    });

    let restricted_occultism_blocks = ['occultism:golden_sacrificial_bowl', 'occultism:sacrificial_bowl'];
    restricted_occultism_blocks.forEach((block) => {
        restrictions.push({
            type: 'or',
            name: block,
            block: true,
            first: { type: 'dimension', dimension: 'atum:atum' },
            second: { type: 'gamestage', stage: 'red_chalk' },
            errorKey: `${errorKey_prefix}red_chalk`
        });
    });

    let restricted_blood_magic_blocks = [
        'bloodmagic:altar',
        'bloodmagic:alchemytable',
        'bloodmagic:demoncrucible',
        'bloodmagic:demoncrystallizer',
        'bloodmagic:alchemytable',
        'bloodmagic:soulforge',
        'bloodmagic:alchemicalreactionchamber',
        'bloodmagic:incensealtar',
        'bloodmagic:accelerationrune',
        'bloodmagic:orbcapacityrune',
        'bloodmagic:bettercapacityrune',
        'bloodmagic:altarcapacityrune',
        'bloodmagic:dislocationrune',
        'bloodmagic:selfsacrificerune',
        'bloodmagic:sacrificerune',
        'bloodmagic:speedrune',
        'bloodmagic:chargingrune',
        'bloodmagic:blankrune'
    ];
    // Requires creation Master Blood Orb to place outside of Undergarden
    restricted_blood_magic_blocks.forEach((block) => {
        restrictions.push({
            type: 'or',
            name: block,
            block: true,
            first: { type: 'dimension', dimension: 'undergarden:undergarden' },
            second: { type: 'gamestage', stage: 'master_blood_orb' },
            errorKey: `${errorKey_prefix}master_blood_orb`
        });
    });

    event.addJson(`restriction:restrictions/expert.json`, restrictions);
});
