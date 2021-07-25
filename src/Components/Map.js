// @flow

import React from "react";
import Cell from "./Cell";  //importing cell component
import Restart from "./Restarts";
import { nestedArray, populateNestedArray, valsAdjacentCounts } from "../modules";  // calling modules 
import Help from "./Help";


class Map extends React.Component{
  constructor(props) {
    super(props);
    let mapSize = 10;
    let bombCount = 10;
    this.state = {
      theMap: valsAdjacentCounts( populateNestedArray(nestedArray(mapSize, mapSize), "☀", bombCount), "☀"),
      cellsClicked: 1,
      bombCount: bombCount,
      mapSize: mapSize
    };
  }

  cellsClicked() {
    let { mapSize, bombCount, cellsClicked } = this.state;  // current state of the component
    let safeCells = mapSize * mapSize - bombCount;          // cells without bombs
    this.setState({
      cellsClicked: cellsClicked + 1                       // click counts of the safe cells
    });
    if (cellsClicked == safeCells) alert("Congratulations, You have won the game!")  // win alert
  }

  refresh(){
    window.location.reload()  // to restart the game
  }

  help(){  // providing the rules of the game
    alert('The aim of the game is to click not on a bomb. The numbers indicate the number of adjecent cells with bomb. Right click to dig and left click to put a flag')
  }

  render() {
    return (
      <div className="mapping">
        <Help handleHelp = {this.help.bind(this)}/>
        <table>
          <tbody>
            {this.state.theMap.map((item, row) => {
              return (
                <tr key={row} className="mapRow">
                  {item.map((subitem, col) => {
                    return (
                      <Cell
                        key={col}
                        row={row}
                        column={col}                                   // cell component element
                        value={subitem}
                        cellsClicked={this.cellsClicked.bind(this)}    // binding function for callback
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Restart handleClick={this.refresh.bind(this)}/>
        
      </div>
    );
  }
}

export default Map;
