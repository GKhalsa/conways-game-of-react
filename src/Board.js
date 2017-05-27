import React, {Component} from 'react';
import Cell from './Cell'

export default class Board extends Component {

  constructor(props){
    super(props);
    this.cells = [];
    this.liveCells = [];
    // this.addToAliveCells = this.addToAliveCells.bind(this);
    this.toggleLife = this.toggleLife.bind(this);
    this.startGame = this.startGame.bind(this);
    this.initialSetup();

    this.state = {
        lifeCycle: 0
    };
  }

  // addToAliveCells(x,y,index){
  //   this.liveCells.push({x,y,index});
  //   console.log(this.liveCells);
  // }

  toggleLife(cell){
    if (this.liveCells.includes(cell)){
      this.liveCells = this.liveCells.filter((aliveCell) => aliveCell !== cell);
      cell.setState({alive:false});
      return;
    }

    this.liveCells.push(cell);
    cell.setState({alive:true});
  }

  initialSetup(){
    for(let i = 0 ; i < 8576 ; i ++){
      this.cells.push(<Cell x={i % 128} y={Math.floor(i / 128)} key={i} index={i} toggleLife={this.toggleLife} addToAliveCells={this.addToAliveCells}/>)
    }
  }

  getNeighborCount(cell){
    let neighbors = [];
    // debugger;
    this.liveCells.forEach((liveCell) => {
      if ((liveCell.props.x >= cell.props.x - 1 && liveCell.props.x <= cell.props.x + 1 ) && (liveCell.props.y >= cell.props.y -1 && liveCell.props.y <= cell.props.y + 1) && (liveCell != cell)   ){
        neighbors.push(liveCell);
      }
    });
    return neighbors.length
  }

  liveCellCheck(){
    let choppingBlock = []
    this.liveCells.forEach((liveCell) => {
      let neighborCount = this.getNeighborCount(liveCell);
      if (neighborCount < 2 || neighborCount > 3){
        choppingBlock.push(liveCell);
      }
    });

    choppingBlock.forEach((cell) => this.toggleLife(cell));

  }

  startGame(){
    // setInterval(() => this.setState({lifeCycle: this.state.lifeCycle + 1}), 1000)
    this.liveCellCheck();
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
