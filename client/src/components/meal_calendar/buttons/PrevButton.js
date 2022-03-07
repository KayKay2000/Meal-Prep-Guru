import styled from "styled-components";

export const PrevButton = styled.button`
    margin-right: 1vw;
    width: 4vw;
    height: 4vw;
    border-radius: 100px;
    box-shadow: 0px 0px 5px 1px #00000020;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vw;
    background-color: white;
    border-style: none;
    padding-left: .1vw;
    color: black;
    transition: .3s;
    &:hover {
        filter: invert(1);
    }
    &:active {
        box-shadow: 0px 0px 5px 1px black;
        background-color: gray;
    }
`