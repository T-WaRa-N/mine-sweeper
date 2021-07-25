import React from "react";
import classNames from "classnames";


let endMineSweeperGame = false;

class Cell extends React.Component{
  constructor(props) {
    super(props);
    this.state = { clicked: false, flag: "", flagBoolean: false };
  }

  handleClick({ target }) {
    let { row, column, cellsClicked, value } = this.props;
    let { clicked, flag } = this.state;
    if (!flag) this.setState({ clicked: true });  // updsting the click event
    if (!clicked) cellsClicked();
    if (!endMineSweeperGame) {
      
      if (value === "" && target.id === `${row}_${column}`) recursionClick(target, row, column); // when clicked an empty cells
    
      if (value === "☀" && !flag){
        endGame(target)
        alert('YOU HAVE LOST, PLAY AGAIN')  // when a bomb is clicked the game ends
      } ;
    }
  }
  handleContextMenu(e) {                   // function to handle the right click event and place a flag
    e.preventDefault();
    let { clicked, flag} = this.state;
    if (!clicked) flag ? this.setState({ flag: "" }) : this.setState({ flag: "⚑" });
    this.setState({flagBoolean: true})        // enabling the flagBoolean class
  }
  render() {
    let { row, column, value } = this.props;  //defining props
    let { clicked, flag, flagBoolean } = this.state;  // defining state
    let cellsClass = classNames({
      cell: true,
      clicked,
      bomb: value === "☀",                  // class names to be added conditionally
      flagBoolean
    });
    return (    
      <td
        id={`${row}_${column}`}            // adding the entry of the matric as the entry
        className={cellsClass}             //  putting class for each cell
        onClick={this.handleClick.bind(this)}   // onclick event is called and binded
        onContextMenu={this.handleContextMenu.bind(this)} // right click event is called and binded
      >
        {clicked && !flag ? value : ""}  
        {flag}
      </td>
    );
  }
}

export default Cell;

function recursionClick(target, row, column) {
  target.id = `${row}_${column}_`;
  let rowList = [row - 1, row, row + 1];
  let colList = [column - 1, column, column + 1];
  for (let i of rowList) {
    for (let j of colList) {
      setImmediate(() => {
        if (document.getElementById(`${i}_${j}`)) document.getElementById(`${i}_${j}`).click()  //simulates the clicking event
      });
    }
  }
  return;
}

function endGame(target) {
  endMineSweeperGame = true;
  target.style.backgroundColor = "black";
  let cols = target.parentElement.children.length;                  // when a mine clicked the function is clicked 
  let rows = target.parentElement.parentElement.children.length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (document.getElementById(`${i}_${j}`)) document.getElementById(`${i}_${j}`).click() // simulating clicking event on all the cells
    }
  }
  return;
}
