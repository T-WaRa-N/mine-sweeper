import React from 'react'

class Restart extends React.Component{
    constructor(props){
       super(props)
    }

    refreshClick(){
        this.props.handleClick()
    }


    render(){
        return <button onClick ={this.refreshClick.bind(this)}><b>Restart</b></button>
    }
}export default Restart