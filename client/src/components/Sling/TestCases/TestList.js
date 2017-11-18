import React, { Component } from 'react';
import axios from 'axios';
import TestEntries from './TestEntries.js';
import TestingFailEntry from './TestingFailEntry.js';

class TestList extends Component {

constructor(props){
    super(props)
    this.state = {
        'failEntry': []
    };

}

   componentWillReceiveProps(nextProp){
       let temp = [];
       let entryArray = [];
       let counter = 0;
       for( let i = 2; i < nextProp.text.length; i++ ){
        if( counter === 3 ){
            entryArray.push(temp);
            temp = [];
            counter = 0;
        } 
        temp.push(nextProp.text[i]);
        counter++;
       }
       this.setState({
         'failEntry': entryArray
       });
   }

  render() {
    return (
      <div className='stdout'>
        {this.props.text.length === 0 ? null : 
        (<div>
        <TestEntries data={this.props.text[0]}/>
        <div id='test-results'>{JSON.parse(JSON.stringify(this.props.text[1]))}</div>
        <div className='fail-test-wrapper'>
        {this.state.failEntry.map( (item, index) => (
            <div className='fail-test-each' key={index}>{item}</div>  
        )) }
        </div>
        </div>)
     }
     </div>
      
    );
  }
}

export default TestList;
