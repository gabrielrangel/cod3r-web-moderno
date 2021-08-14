import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({span}) => span ? `grid-column: span ${span};` : ''}
  
  outline: none;
  border: none;
  
  background-color: ${({operator}) => operator ? 'rgb(255, 157, 0)' : 'rgb(122, 122, 123)' };
  
  :active{
    background-color: rgb(176, 176, 176);
  }
`

export function Button(props){
    return (
        <StyledButton
            value={props.children}
            {...props}>
            {props.children}
        </StyledButton>
    )
}