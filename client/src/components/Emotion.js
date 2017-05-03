import React, { Component } from 'react';


class Emotion extends Component {
  constructor(props) {
    super(props);
  }


 render() {
  

   return (
      <li className="Emotion">
        
        <input type="checkbox" name="emotions" value={this.props.emotion} />
       {this.props.emotion}


     </li>
    );
  }
}

export default Emotion;

