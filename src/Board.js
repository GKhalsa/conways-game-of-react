import React, {Component} from 'react';
import Cell from './Cell'

export default class Board extends Component {

  constructor(props){
    super(props)
    this.cells = [];
    this.aliveCells = [];
    this.addToAliveCells = this.addToAliveCells.bind(this);
    this.toggleLife = this.toggleLife.bind(this);
    this.startGame = this.startGame.bind(this);
    this.initialSetup();

    this.state = {
        lifeCycle: 0
    }
  }

  addToAliveCells(x,y,index){
    this.aliveCells.push({x,y,index});
    console.log(this.aliveCells);
  }

  toggleLife(cell){
    if (this.aliveCells.includes(cell)){
      this.aliveCells = this.aliveCells.filter((aliveCell) => aliveCell !== cell);
      cell.setState({alive:false});
      return;
    }

    this.aliveCells.push(cell)
    cell.setState({alive:true});
  }

  initialSetup(){
    for(let i = 0 ; i < 8576 ; i ++){
      this.cells.push(<Cell x={i % 128} y={Math.floor(i / 128)} key={i} index={i} toggleLife={this.toggleLife} addToAliveCells={this.addToAliveCells}/>)
    }
  }

  startGame(){
    setInterval(() => this.setState({lifeCycle: this.state.lifeCycle + 1}), 1000)
  }

  render() {

    return (
      <div >
        <div className="flex-container wrap">
          {this.cells}
        </div>
        <button onClick={this.startGame}>Start</button>
        <div>{this.state.lifeCycle}</div>
      </div>
    )

  }

}
