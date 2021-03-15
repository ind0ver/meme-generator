import React, { Component } from "react";
import AddedBlocks from "./components/AddedBlocks";
import BlocksLeft from './components/buttons/BlocksLeft';
import StartActivity from './js/activities';
import ImageContainer from './components/ImageContainer';

class App extends Component {
  state = {
    imgCount: [],
    blocks: [],
    activities: [
      {id: 1, name: 'Open Google'},
      {id: 2, name: 'Open Yandex'},
      {id: 3, name: 'Open Yahoo Finance'},
      {id: 4, name: 'Get Random Picture'}
    ]
  };

  handleAddImage = () => {
    const lastId = this.state.imgCount.length > 0 ? this.state.imgCount[this.state.imgCount.length - 1].id + 1 : 1;
    this.state.imgCount.push( {id: lastId} );
    this.setState({ ...this.state.imgCount });
  }

  handleAdd = activityId => {
    const thisActivity = this.state.activities.filter(i => i.id === activityId)[0];
    const lastId = this.state.blocks.length > 0 ? this.state.blocks[this.state.blocks.length - 1].bid + 1 : 1;
    const objToPush = {};
    Object.assign(objToPush, thisActivity);
    objToPush.bid = lastId;
    this.state.blocks.push( objToPush );
    this.setState({ ...this.state.blocks });
  }

  handleDelete = bidtd => {
    const blocks = this.state.blocks.filter(b => b.bid !== bidtd);
    this.setState({ blocks });
  };

  handleStart = () => {
    for(const block of this.state.blocks){
      StartActivity(block.id)
    }
  }

  render() {
    return (
            <div className='leftAndRight'>
                <div className='leftArea'>
                    <BlocksLeft 
                        activities={this.state.activities}
                        passedClassName='btn-tmplt'
                        onAdd={this.handleAdd}
                    />
                    <ImageContainer
                        imgCount={this.state.imgCount}
                    />
                 </div>
                <div className='rightArea' id='canvas'>
                    {/* <button onClick={this.handleAdd}>ADD</button> */}
                    <button className="btn btn-success btn-start" onClick={this.handleStart}>START</button>
                    {/* <button className="btn btn-success btn-start" onClick={this.handleAddImage}>IMAGE</button> */}
                    <AddedBlocks
                        blocks={this.state.blocks}
                        passedClassName='btn-added'
                        onDelete={this.handleDelete}
                    />
                </div>
            </div>
        )
  }
}

export default App;
