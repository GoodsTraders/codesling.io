import React, { Component } from 'react';
import axios from 'axios';

class TestingFailEntry extends Component {

  render() {
    return (
     <div>
         {this.props.data.map((item) => (
            <div>{item.includes('✓') ? <div className='passing-test'>{item}</div> :  <div className='failing-test'>{item}</div> }   
            </div>     
         ))}
      </div>
    );
  }
}

export default TestingFailEntry;
