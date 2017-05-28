import React,{Component} from 'react'

export default class Cell extends Component {

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     alive: false
  //   };
  //
  // }

  render(){
    // console.log("render",this.props.index, this.props.alive)
    let backgroundColor;
    if (this.props.alive){ backgroundColor = "background-color";}

    return (
      <div className={"flex-item " + backgroundColor} onClick={() => {this.props.toggleLife(this)}}>

      </div>
    )
  }
}
