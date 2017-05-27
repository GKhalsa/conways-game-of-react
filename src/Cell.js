import React,{Component} from 'react'

export default class Cell extends Component {

  constructor(props){
    super(props);
    this.state = {
      alive: false
    };

  }

  render(){
    let backgroundColor;
    if (this.state.alive){ backgroundColor = "background-color";}

    return (
      <div className={"flex-item " + backgroundColor} onClick={() => {this.props.toggleLife(this)}}>

      </div>
    )
  }
}
