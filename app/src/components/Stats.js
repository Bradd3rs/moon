import React from 'react';

const Stats = (props) => (
    <ul>
        <li>GOLD: {props.gold}</li>
        <li>HP: {((props.bossHp * props.multiplier) * 100 ).toFixed(0)}</li>
        <li>ATT DMG: {((props.attDmg  * props.multiplier) * 100).toFixed(0)}</li>
        <li>BIGEST CRIT: {((props.bigestCrit * props.multiplier) * 100).toFixed(0)}</li>
        <li>LAST CRIT: {((props.lastCrit  * props.multiplier) * 100).toFixed(0)}</li>
        <li>CRIT CHANCE: {(props.critChance  * props.multiplier).toFixed(2)}</li>
        <li>ATT SPEED: {props.attackSpeed}</li>
    </ul>
);

export default Stats;