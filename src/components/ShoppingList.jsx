import React, { Component } from 'react';
import ShoppingItem from './ShoppingItem';

class ShoppingList extends Component {
  state = {
    list: [],
    savedList: [],
  };

  constructor(props) {
    super(props);
    const { list } = props;
    const { savedList } = this.state;
    this.state.list = list != null ? list : [];
    this.state.savedList.push.apply(savedList, this.state.list);
  }

  render() {
    const { list } = this.props;

    return (
      <div>
        <button onClick={() => this.Reset()} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
        <button onClick={() => this.Save()} className="btn btn-primary btn-sm m-2">
          Save
        </button>
        <button onClick={() => this.AddItem()} className="btn btn-success btn-sm m-2">
          Add
        </button>
        {this.state.list.map((counter) => (
          <ShoppingItem key={counter.id} onDelete={() => this.RemoveItem(counter.id)} counter={counter}></ShoppingItem>
        ))}
      </div>
    );
  }

  AddItem() {
    const { list } = this.state;
    list.push({
      id: list.length,
      value: 0,
    });
    this.setState({
      list,
    });
  }

  RemoveItem(id) {
    const list = this.state.list.filter((c) => c.id !== id);
    this.setState({
      list,
    });
  }

  Reset() {
    var { list } = this.state;
    const { savedList } = this.state;
    console.log(savedList);
    list.length = 0;
    list.push.apply(list, savedList);
    this.setState({
      list,
    });

    console.log(this.state.list);
  }

  Save() {
    const { list } = this.state;
    var { savedList } = this.state;
    savedList.length = 0;
    list.push.apply(savedList, list);
    this.setState({
      savedList,
    });
  }
}

export default ShoppingList;
