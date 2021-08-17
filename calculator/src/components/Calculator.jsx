import {useState} from "react";
import styled from "styled-components";

import {Display} from "./Display";
import {Button} from "./Button";

const buttonList = [
    {children: 'C', span: 3}, {children: '÷', value: '/', operator: true},
    {children: '7'}, {children: '8'}, {children: '9'}, {children: '×', value: '*', operator: true},
    {children: '4'}, {children: '5'}, {children: '6'}, {children: '-', operator: true},
    {children: '1'}, {children: '2'}, {children: '3'}, {children: '+', operator: true},
    {children: '0', span: 2}, {children: '.'}, {children: '=', operator: true}
]

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 80px 1fr 1fr 1fr 1fr 1fr;
  gap: 1px;
  background-color: rgb(79, 79, 80);
  border: solid 1px rgb(125, 125, 126);
  border-radius: 8px;
  overflow: hidden;

  min-width: 260px;
  min-height: 380px;

  resize: both;

  * {
    color: white;
    font-size: 24px;
    font-family: 'Roboto Mono', monospace;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
`

export function Calculator() {
    const [memory, setMemory] = useState('0')

    const getExpression = () => /.*\d/.exec(memory).pop()

    const getResult = () => String(eval(getExpression()))

    const lastNumberInMemory = () => /-?\d+\.?\d*$/.exec(memory) || /\d\.?\d*(?=[+-/*]$)/.exec(memory)

    const handleClickButton = (value) => {
        let newMemory = memory === '0' ? '' : memory
        newMemory = /[*+\-=\/]/.exec(value) ? getExpression() : newMemory
        newMemory = `${newMemory}${value}`
        newMemory = value === 'C' ? '0' : newMemory
        newMemory = value === '=' ? getResult() : newMemory
        setMemory(newMemory)
    }

    return (
        <Container>
            <Display>{lastNumberInMemory()}</Display>
            {buttonList.map((props, key) =>
                <Button
                    onClick={(e) => handleClickButton(e.target.value)}
                    key={key}
                    {...props}/>)}
        </Container>
    )
}
