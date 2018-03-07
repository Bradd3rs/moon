import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bossHp: 1,
      dps: 0.00001,
      attackSpeed: 1000,
      goldChance: 0.01,
      critChance: 0.012,
      bigestCrit: 0,
      lastCrit: 0,
      gold: 0
    }
    this.increaseDps = this.increaseDps.bind(this);
    this.increaseGoldChance = this.increaseGoldChance.bind(this);
    this.increaseCritChance = this.increaseCritChance.bind(this);
    this.increaseAttackSpeed = this.increaseAttackSpeed.bind(this);
  }
  componentDidMount() {
    // componentDidMount is called by react when the component 
    // has been rendered on the page. We can set the interval here:
    this.setAttackSpeed()
     //or
    //this.timer = setInterval(() => this.tick(), 10000);
  }
  componentWillUnmount() {
    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:

    clearInterval(this.timer);
  }

  setAttackSpeed() {
    const attackSpeed = this.state.attackSpeed;
    
    // clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this), attackSpeed);
  }

  tick() {

    // This function is called every 50 ms. It updates the 
    // elapsed counter. Calling setState causes the component to be re-rendered
    const dps = this.state.dps;
    const goldChance = this.state.goldChance;
    const bossHp = this.state.bossHp;
    
    if(bossHp <= 0) {

      this.setState((prevState) => ({
        bossHp: 0
      }))
      clearInterval(this.timer);
    } else {
        const random = Math.random() * 1;
        console.log(random, random > goldChance);
        if(random <= goldChance) {
    
          this.setState((prevState) => ({
            gold: prevState.gold + 1
          }))
        }
        if(random <= this.state.critChance) {
          console.log('You crit');
          this.crit()
        }
    
        this.setState((prevState) => ({
          bossHp: prevState.bossHp - dps
        }))
    }
  }
  crit() {
    const dps = this.state.dps;
    const crit = dps * (Math.random() * 100);
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
  increaseDps() {
    this.setState((prevState) => ({
      dps: prevState.dps + 0.00001
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
        <ul>
          <li>
            GOLD: {this.state.gold}
          </li>
          <li>
            HP: {this.state.bossHp.toFixed(5)}
          </li>
          <li>
            DPS: {this.state.dps.toFixed(5)}
          </li>
          <li>
            BIGGEST CRIT: {this.state.bigestCrit.toFixed(5)}
          </li>
          <li>
            LAST CRIT: {this.state.lastCrit.toFixed(5)}
          </li>
          <li>
            CRIT CHANCE: {this.state.critChance.toFixed(3)}
          </li>
          <li>
            ATT SPEED: {this.state.attackSpeed.toFixed(5)}
          </li>
        </ul>
        <button type="button" onClick={this.increaseDps}>DPS +</button>
        <button type="button" onClick={this.increaseAttackSpeed}>ATTSPEED +</button>
        <button type="button" onClick={this.increaseGoldChance}>GOLD CHANCE +</button>
        <button type="button" onClick={this.increaseCritChance}>CRIT CHANCE +</button>
      </section>
    );
  }
}

export default App;
