import React from 'react';

const Controls = (props) => (
    <div>
        <button type="button" onClick={props.start}>START</button>
        <button type="button" onClick={props.increaseattDmg}>ATT DMG +</button>
        <button type="button" onClick={props.increaseAttackSpeed}>ATTSPEED +</button>
        <button type="button" onClick={props.increaseGoldChance}>GOLD CHANCE +</button>
        <button type="button" onClick={props.increaseCritChance}>CRIT CHANCE +</button>
        <button type="button" onClick={props.damage}>HIT</button>
    </div>
);

export default Controls;