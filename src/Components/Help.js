import React from 'react'

class Help extends React.Component{
    constructor(props){
        super(props)
    }
    
    help(){
        this.props.handleHelp()
    }

    render(){
        return<button onClick={this.help.bind(this)}><b>Help</b></button>
    }

}export default Help