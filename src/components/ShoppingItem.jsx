import React, { Component } from 'react';

class ShoppingItem extends Component {
  constructor(props) {
    super(props);
    this.state.count = props.counter.value;
  }

  state = { count: 0 };

  styles = {
    fontWeight: 'bold',
  };
  render() {
    return (
      <div>
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formateCount()}
        </span>
        <button onClick={() => this.Add()} className="btn btn-secondary btn-sm">
          +
        </button>
        <button onClick={() => this.Retract()} className="btn btn-secondary btn-sm">
          -
        </button>
        <button onClick={() => this.props.onDelete()} className="btn btn-danger btn-sm m-2">
          Delete
        </button>
      </div>
    );
  }

  Add() {
    var { count } = this.state;
    count += 1;
    this.setState({
      count,
    });
  }

  Retract() {
    var { count } = this.state;
    count = count > 0 ? count - 1 : 0;
    this.setState({
      count,
    });
  }

  getBadgeClasses() {
    let classes = 'badge m-2 badge-';
    classes += this.state.count === 0 ? 'warning' : 'primary';
    return classes;
  }

  formateCount() {
    const { count } = this.state;
    return count === 0 ? 'Zero' : count;
  }
}

export default ShoppingItem;
