import React, { Component } from 'react';

import './Calculator.css'

import Button from "../components/Button/Button.jsx"
import Display from '../components/Display/Display.jsx';

// Estado inicial da calculadora
const initialState = {
    displayValue: '0',       // Valor exibido no display (sempre string)
    clearDisplay: false,     // Indica se o display deve ser limpo no próximo dígito
    operation: null,         // Operação atual (+, -, *, /)
    values: [0, 0],          // Valores armazenados para cálculo
    current: 0               // Índice do valor atual (0 ou 1)
}

export default class Calculator extends Component {

    // Inicializa o estado com base no estado inicial
    state = { ...initialState }

    constructor(props) {
        super(props)

        // Faz o bind dos métodos para garantir o "this"
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    // Reseta a calculadora para o estado inicial
    clearMemory() {
        this.setState({ ...initialState })
    }

    // Define a operação matemática
    setOperation(operation) {

        // Se ainda está no primeiro valor
        if (this.state.current === 0) {
            this.setState({
                operation,           // salva a operação
                current: 1,          // muda para o segundo valor
                clearDisplay: true   // limpa o display ao digitar próximo número
            })
        } else {
            // Se já tem dois valores, realiza o cálculo

            const finished = operation === '='               // verifica se é "="
            const currentOperation = this.state.operation    // operação atual
            const values = [...this.state.values]            // copia dos valores

            try {
                // Executa o cálculo (ex: 10 + 5)
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                // Em caso de erro, mantém o valor anterior
                values[0] = this.state.values[0]
            }

            values[1] = 0 // reseta o segundo valor

            // Atualiza o estado com o resultado
            this.setState({
                displayValue: values[0].toString(),     // mostra resultado no display
                operation: finished ? null : operation, // limpa operação se "="
                current: finished ? 0 : 1,              // volta para início ou continua
                clearDisplay: !finished,                // limpa display se continuar
                values
            })
        }
    }

    // Adiciona dígitos (números ou ponto)
    addDigit(n) {

        // Evita adicionar mais de um ponto decimal
        if (n === '.' && this.state.displayValue.includes('.')) return

        // Verifica se deve limpar o display
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

        // Define o valor atual do display
        const currentValue = clearDisplay ? '' : this.state.displayValue

        // Concatena o novo dígito
        const displayValue = currentValue + n

        // Atualiza o display
        this.setState({ displayValue, clearDisplay: false })

        // Se não for ponto, atualiza o valor numérico
        if (n !== '.') {
            const i = this.state.current                  // índice atual (0 ou 1)
            const newValue = parseFloat(displayValue)     // converte para número

            const values = [...this.state.values]         // copia array
            values[i] = newValue                          // atualiza valor

            this.setState({ values })
        }
    }

    render() {
        return (
            <div className='calculator'>
                {/* Display da calculadora */}
                <Display value={this.state.displayValue} />

                {/* Botões */}
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