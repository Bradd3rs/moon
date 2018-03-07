import React, {Component} from 'react';
import styled from 'styled-components';

class HealthBar extends Component {
    render() {
        let bossHp = this.props.bossHp * this.props.multiplier;
        let initialHp = this.props.initialHp * this.props.multiplier;

        const healthContainerStyle = {
            width: `${initialHp.toFixed(0) + '%'}`
        }
        const actualHealthStyle = {
            width: `${bossHp.toFixed(0) + '%'}`
        }

        return (
            <Health style={healthContainerStyle} >
                <ActualHealth style={actualHealthStyle} ></ActualHealth>
            </Health>
        )
    }
}

const Health = styled.div`
    height: 20px;
    max-width: 600px;
    background: blue;
    margin: auto;
`;

const ActualHealth = styled.div`
    height: 20px;
    background: red;
    transition: width .2s ease-in-out;
`;

export default HealthBar;