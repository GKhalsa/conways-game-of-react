import React, {Component} from 'react';
import Cell from './Cell'

export default class Board extends Component {

  constructor(props){
    super(props);
    this.liveCells = [];
    this.toggleLife = this.toggleLife.bind(this);

    this.state = {
        lifeCycle: 0,
        cells:[],
        intervalId: 0
    };
  }

  isAlreadyAlive(index){
    let firstCount = this.liveCells.length;
    let filteredLiveCells = this.liveCells.filter((liveCell) => liveCell.index !== index);
    let secondCount = filteredLiveCells.length;
    this.liveCells = filteredLiveCells;
    return firstCount !== secondCount;
  }

  toggleLife(cell){
    let cellProps;
    if (cell.props){
      cellProps = cell.props;
    } else {
      cellProps = cell;
    }

    let alive = true;

    if(this.isAlreadyAlive(cellProps.index)){
      alive = false;
    } else {
      this.liveCells.push({x:cellProps.x, y:cellProps.y, index:cellProps.index});
    }

    let newCellArray = this.addCellToBoard(cellProps, this.state.cells, alive);
    this.setState({cells:newCellArray});

  }

  cellsReducer(cellArray, newLife){
    let cellsToSetToState = this.state.cells;

    cellArray.forEach((cell) => {
      this.liveCells = this.liveCells.filter((liveCell) => liveCell.index !== cell.index);
      cellsToSetToState = this.addCellToBoard(cell, cellsToSetToState, false);
    });

    newLife.forEach((cell) => {
      this.liveCells.push({x:cell.props.x, y:cell.props.y, index:cell.props.index});
      cellsToSetToState = this.addCellToBoard(cell.props, cellsToSetToState, true);
    });
    this.setState({cells: cellsToSetToState});
  }

  addCellToBoard(cell, cellsToSetToState, alive){
    let newCell = <Cell x={cell.x} y={cell.y} index={cell.index} alive={alive} toggleLife={this.toggleLife} key={cell.index}/>
    const beforeCell = cellsToSetToState.slice(0,cell.index);
    const afterCell = cellsToSetToState.slice(cell.index + 1);
    return [...beforeCell,newCell,...afterCell];
  }

  componentWillMount(){
    let initialCells = []
    for(let i = 0 ; i < 8576 ; i ++){
      initialCells.push(<Cell x={i % 128} y={Math.floor(i / 128)} key={i} index={i} alive={false} toggleLife={this.toggleLife}/>)
    }
    this.setState({cells: initialCells});
  }

  getNeighborCount(cell){
    let neighbors = [];
    this.liveCells.forEach((liveCell) => {
      if ((liveCell.x >= cell.x - 1 && liveCell.x <= cell.x + 1 ) && (liveCell.y >= cell.y -1 && liveCell.y <= cell.y + 1) && (liveCell != cell) ){
        neighbors.push(liveCell);
      }
    });
    return neighbors.length;
  }

  getNeighborCount2(cell){
    let neighbors = [];
    this.liveCells.forEach((liveCell) => {
      if ((liveCell.x >= cell.props.x - 1 && liveCell.x <= cell.props.x + 1 ) && (liveCell.y >= cell.props.y -1 && liveCell.y <= cell.props.y + 1) && (liveCell.x != cell.props.x || liveCell.y != cell.props.y) && !cell.props.alive  ){
        neighbors.push(liveCell);
      }
    });
    return neighbors.length;
  }

  liveCellCheck(){
    let choppingBlock = [];
    let newLife = [];

    this.liveCells.forEach((liveCell) => {
      let neighborCount = this.getNeighborCount(liveCell);
      if (neighborCount < 2 || neighborCount > 3){
        choppingBlock.push(liveCell);
      }
    });

    this.state.cells.forEach((cell) => {
      let neighborCount = this.getNeighborCount2(cell);
      if (neighborCount == 3){
        newLife.push(cell);
      }
    });

    this.cellsReducer(choppingBlock, newLife);
  }

  startGame(){
      if (this.state.intervalId > 0) {
      return ;
    }

    let intervalId = setInterval(this.timer.bind(this), 1000)
    this.setState({intervalId: intervalId})

  }

  stopGame(){
    clearInterval(this.state.intervalId);
    this.setState({intervalId: 0})
  }

  timer(){
    this.liveCellCheck();
    this.setState({lifeCycle: this.state.lifeCycle + 1})
  }

  render() {


    return (
      <div >
        <div className="flex-container wrap">
          {this.state.cells}
        </div>
        <button onClick={this.startGame.bind(this)}>Start</button>
        <button onClick={this.stopGame.bind(this)}>Stop</button>
        <div>Generation: {this.state.lifeCycle}</div>
        <div>There are 4 rules:</div>
        <div>1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.</div>
        <div>2. Any live cell with two or three live neighbours lives on to the next generation.</div>
        <div>3. Any live cell with more than three live neighbours dies, as if by overpopulation.</div>
        <div>4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</div>
      </div>
    )

  }

}
