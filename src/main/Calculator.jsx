import React, { Component } from 'react';

import './Calculator.css'

import Button from "../components/Button/Button.jsx"
import Display from '../components/Display/Display.jsx';

export default class Calculator extends Component {

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        console.log('limpar')
    }

    setOperation(operator) {
        console.log(operator)
    }

    addDigit(n) {
        console.log(n)
    }

    render() {
        return (
            <div className='calculator'>
                <Display value={500} />
                <Button click={this.clearMemory} label="AC" col3 />
                <Button click={this.setOperation} label="/" operation />
                <Button click={this.addDigit} label="7" />
                <Button click={this.addDigit} label="8" />
                <Button click={this.addDigit} label="9" />
                <Button click={this.setOperation} label="*" operation />
                <Button click={this.addDigit} label="4" />
                <Button click={this.addDigit} label="5" />
                <Button click={this.addDigit} label="6" />
                <Button click={this.setOperation} label="-" operation />
                <Button click={this.addDigit} label="1" />
                <Button click={this.addDigit} label="2" />
                <Button click={this.addDigit} label="3" />
                <Button click={this.setOperation} label="+" operation />
                <Button click={this.addDigit} label="0" col2 />
                <Button click={this.addDigit} label="." />
                <Button click={this.setOperation} label="=" operation />

            </div>
        )
    }

}