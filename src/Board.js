import React, {Component} from 'react';
import Cell from './Cell'

export default class Board extends Component {

  constructor(props){
    super(props);

    // this.state = {
    //   cells: [],
    //   intervalId:0
    // };

    this.liveCells = [];
    this.toggleLife = this.toggleLife.bind(this);
    // this.startGame = this.startGame.bind(this);

    this.state = {
        lifeCycle: 0,
        cells:[]
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

    let newCell = <Cell x={cellProps.x} y={cellProps.y} index={cellProps.index} alive={alive} toggleLife={this.toggleLife} key={cellProps.index}/>
    const beforeCell = this.state.cells.slice(0,cellProps.index);
    const afterCell = this.state.cells.slice(cellProps.index + 1);
    const newCellArray = [...beforeCell,newCell,...afterCell];
    this.setState({cells:newCellArray});


  }

  cellsReducer(cellArray, newLife){
    let cellsToSetToState = this.state.cells;
    cellArray.forEach((cell) => {
      this.liveCells = this.liveCells.filter((liveCell) => liveCell.index !== cell.index)
      let newCell = <Cell x={cell.x} y={cell.y} index={cell.index} alive={false} toggleLife={this.toggleLife} key={cell.index}/>
      const beforeCell = cellsToSetToState.slice(0,cell.index);
      const afterCell = cellsToSetToState.slice(cell.index + 1);
      cellsToSetToState = [...beforeCell,newCell,...afterCell];
    })

    newLife.forEach((cell) => {
      this.liveCells.push({x:cell.props.x, y:cell.props.y, index:cell.props.index});
      // this.liveCells.push(cell)
      let newCell = <Cell x={cell.props.x} y={cell.props.y} index={cell.props.index} alive={true} toggleLife={this.toggleLife} key={cell.props.index}/>
      const beforeCell = cellsToSetToState.slice(0,cell.props.index);
      const afterCell = cellsToSetToState.slice(cell.props.index + 1);
      cellsToSetToState = [...beforeCell,newCell,...afterCell];
    })
    this.setState({cells: cellsToSetToState});
  }

  // cellsReducer2(cellArray){
  //   let cellsToSetToState = this.state.cells;
  //   cellArray.forEach((cell) => {
  //     // this.liveCells = this.liveCells.filter((liveCell) => liveCell.index !== cell.index)
  //     this.liveCells.push({x:cell.props.x, y:cell.props.y, index:cell.props.index});
  //     // this.liveCells.push(cell)
  //     let newCell = <Cell x={cell.props.x} y={cell.props.y} index={cell.props.index} alive={true} toggleLife={this.toggleLife} key={cell.props.index}/>
  //     const beforeCell = cellsToSetToState.slice(0,cell.props.index);
  //     const afterCell = cellsToSetToState.slice(cell.props.index + 1);
  //     cellsToSetToState = [...beforeCell,newCell,...afterCell];
  //   })
  //   this.setState({cells: cellsToSetToState});
  // }


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
    // this.cellsReducer2(newLife);


    // choppingBlock.forEach((cell) => {
    //   this.toggleArrayOfLiveCells(cell)
    // });
    // newLife.forEach((cell) => cell.props.toggleLife);
  }

  startGame(){
    // let intervalId = setInterval(this.setState({lifeCycle: this.state.lifeCycle + 1}), 1000)
    let intervalId = setInterval(this.timer.bind(this), 1000)
    // this.liveCellCheck();
  }

  timer(){
    this.liveCellCheck();
    this.setState({lifeCycle: this.state.lifeCycle + 1})
  }

  render() {

    // for(let i = 0 ; i < 8576 ; i ++){
      // this.cells.push(<Cell />)
      // this.cells.push(React.createElement(Cell, { x:{i % 128} y:{Math.floor(i / 128)} key:{i} index:{i} toggleLife:{this.toggleLife} }, null) )
    // }

    // for(let i = 0 ; i < 8576 ; i ++){
    //   this.cells.push(<Cell x={i % 128} y={Math.floor(i / 128)} key={i} index={i} alive={false} toggleLife={this.toggleLife}/>)
    // }

    return (
      <div >
        <div className="flex-container wrap">
          {this.state.cells}
        </div>
        <button onClick={this.startGame.bind(this)}>Start</button>
        <div>{this.state.lifeCycle}</div>
      </div>
    )

  }

}
