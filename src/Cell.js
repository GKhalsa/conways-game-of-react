import React,{Component} from 'react'

export default class Cell extends Component {

  render(){
    let backgroundColor;
    if (this.props.alive){ backgroundColor = "background-color";}

    return (
      <div className={"flex-item " + backgroundColor} onClick={() => {this.props.toggleLife(this)}}>

      </div>
    )
  }
}
