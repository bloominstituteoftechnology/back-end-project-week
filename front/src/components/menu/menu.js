import React, { Component, Link } from "react";

class Menu extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }


  componentWillMount(){
    this.setState({notes: this.props.notes});
    console.log(this.state.notes);
  }

  render() {
    return (
      <div className="menu">
        {/* <div className="menu__header">
          <p>Sparks Note</p>
        </div>

        <div className="menu__buttons">
          <a href="/" className="menu__buttons__links"><div className="menu__buttons--align">
            <p className="menu__buttons__text" >View Your Notes</p>
          </div></a>

          <a href="/newnote" className="menu__buttons__links"><div className="menu__buttons--align">
            <p className="menu__buttons__text">+ Create New Note</p>
          </div></a>

        </div> */}

        {/* {this.props.notes.map((noteObj, i) => {
            return(
                <div>
                    <h1>{noteObj.title}</h1>
                    <p>{noteObj.content}</p>
                </div>
            )
        })} */}

        
      </div>
      )
  }
}

export default Menu;