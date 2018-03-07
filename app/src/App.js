import React, { Component } from 'react';
import Controls from './components/Controls';
import Stats from './components/Stats';
import HealthBar from './components/HealthBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialHp: 1,
      bossHp: 1,
      attDmg: 0.0001,
      attackSpeed: 1000,
      goldChance: 0.1,
      critChance: 0.001,
      bigestCrit: 0,
      lastCrit: 0,
      gold: 0,
      multiplier: 100
    }
    this.start = this.start.bind(this);
    this.increaseattDmg = this.increaseattDmg.bind(this);
    this.increaseGoldChance = this.increaseGoldChance.bind(this);
    this.increaseCritChance = this.increaseCritChance.bind(this);
    this.increaseAttackSpeed = this.increaseAttackSpeed.bind(this);
    this.damage = this.damage.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  setAttackSpeed() {

    const attackSpeed = this.state.attackSpeed;
    this.timer = setInterval(this.tick.bind(this), attackSpeed);
  }
  start() {
    this.setAttackSpeed()
  }
  tick() {
    const goldChance = this.state.goldChance;
    const bossHp = this.state.bossHp;
    
    if(bossHp <= 0) {
      this.setState((prevState) => ({
        bossHp: 0,
        initialHp: 1
      }))
      
      clearInterval(this.timer);

    } else {
        const random = Math.random() * 1;
        if(random <= goldChance) {
    
          this.setState((prevState) => ({
            gold: prevState.gold + 1
          }))
        }
        if(random <= this.state.critChance) {
          this.crit()
        }
    
        this.damage();
    }
  }
  damage() {
    const attDmg = this.state.attDmg;
    this.setState((prevState) => ({
      bossHp: prevState.bossHp - attDmg
    }))
  }
  crit() {
    const attDmg = this.state.attDmg;
    const crit = attDmg * (Math.random() * 100);
    this.setState((prevState) => ({
      bossHp: prevState.bossHp - crit,
      lastCrit: crit
    }))
    if(crit > this.state.bigestCrit) {
      this.setState(() => ({
        bigestCrit: crit
      }))
    }

  }
  increaseCritChance() {
    this.setState((prevState) => ({
      critChance: prevState.critChance + 0.001
    }))
  }
  increaseattDmg() {
    this.setState((prevState) => ({
      attDmg: prevState.attDmg + 0.00001
    }))
  }
  increaseGoldChance() {
    this.setState((prevState) => ({
      goldChance: prevState.goldChance + 1
    }))
  }
  increaseAttackSpeed() {
    this.setState((prevState) => ({
      attackSpeed: prevState.attackSpeed - 1
    }))
    this.setAttackSpeed()
  }

  render() {
    return (
      <section>
        <HealthBar
          initialHp={this.state.initialHp}
          bossHp={this.state.bossHp}
          multiplier={this.state.multiplier}
        />
        <Stats 
          gold={this.state.gold}
          bossHp={this.state.bossHp}
          attDmg={this.state.attDmg}
          bigestCrit={this.state.bigestCrit}
          lastCrit={this.state.lastCrit}
          critChance={this.state.critChance}
          attackSpeed={this.state.attackSpeed}
          multiplier={this.state.multiplier}
        />
        <Controls 
          start={this.start} 
          increaseattDmg={this.increaseattDmg} 
          increaseAttackSpeed={this.increaseAttackSpeed}
          increaseGoldChance={this.increaseGoldChance}
          increaseCritChance={this.increaseCritChance}
          damage={this.damage}
        />
      </section>
    );
  }
}

export default App;
