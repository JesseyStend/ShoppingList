import React, { Component } from 'react';
import NavBar from './components/navbar';
import ShoppingList from './components/ShoppingList';
import './App.css';

class App extends Component {
  state = {
    counters: [
      {
        id: 0,
        value: 0,
      },
      {
        id: 1,
        value: 0,
      },
      {
        id: 2,
        value: 0,
      },
      {
        id: 3,
        value: 9,
      },
    ],
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({
      counters,
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar totalCounters={this.state.counters.filter((c) => c.value > 0).length} />
        <main className="container">
          <ShoppingList list={this.state.counters} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
