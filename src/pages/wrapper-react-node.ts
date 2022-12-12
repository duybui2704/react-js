import React, { Component } from 'react';
import Home from './home';

class App extends Component {
    alertName = () => {
        alert('John Doe');
    };
  
    render() {
        return React.createElement('a', Home);
    }
}
  
export default App;
  