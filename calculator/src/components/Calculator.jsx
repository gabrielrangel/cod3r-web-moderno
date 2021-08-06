import styled from "styled-components";
import {useState} from "react";

const keyboardOptions = ['C', '½', '%']
const operations = ['÷', '×', '−', '+', '=']

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  
  outline: solid 1px rgb(28, 28, 28);
  border: solid 1px rgba(255, 255, 255, .1);
  border-radius: 8px;
  
  background-color: #26272F;
  
  overflow: hidden;
  
  width: 265px;
  min-width: 265px;
  min-height: 360px;
  resize: both;
  
   * {
    gap: 1px;
  }
`

const Display = styled.output`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  
  width: 100%;
  padding: 10px;
  
  background-color: #26272F;
  
  color: white;
  font-size: 36px;
  font-family: 'Open Sans', sans-serif;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: ${props => props.nogrow ? 0 : 1};
  
  min-width: 50px;
  
  padding: 5px;
  border: none;
  
  color: white;
  font-size: 24px;
  font-family: 'Roboto Mono', monospace;
  
  background-color: ${props => {
    return (
        props.operations ?
            'rgb(255, 157, 0)' : 
        props.option ? 
            'rgb(98,101,101)' : 
        'rgb(124, 126, 126)'
    )
  }};
  
  :active{
    background-color: ${props => {
      return (
          props.operations ? 
              'rgb(213, 124, 0)' : 
          props.option ? 
              'rgb(124,126,126)' : 
          'rgb(177, 178, 178)'
      )}};
  }
`

const Keyboard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 75%;
  justify-content: flex-end;
  
  button {
    min-width: 33%;
    max-width: 67%;
    
  }
`

const Operations = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`

export function Calculator () {
    const [result, setResult] = useState('0');
    return (
        <Container>
            <Display>{result}</Display>
            <Keyboard>
                {[
                    keyboardOptions.map(option => {
                        return (
                            <Button
                                option
                                value={option}
                            >
                                {option}
                            </Button>)
                    }),
                    ...Array.from(Array(10),(_,i)=> {
                        return (
                            <Button
                                value={i}
                                onClick={(e)=>setResult(`${result === '0' ? '' : result}${e.target.value}`)}
                            >{i}</Button>)
                    }).reverse(),
                    <Button nogrow value={','}>{','}</Button>
                ]}
            </Keyboard>
            <Operations>
                {operations.map(operation => <Button operations value={operation} >{operation}</Button>)}
            </Operations>
        </Container>
    )
}