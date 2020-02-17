import React, {useState} from 'react';
import styled from 'styled-components';

import Blocks from './blocks';
import Platform from './platform';
import Grid from './grid';
import Parallax from './parallax-background';

const Wrapper = styled.div`
    color: white;
    position: fixed;
    overflow-x: hidden;
    transition: all 0.3s;
    transition-delay: ${props => props.open ? '0s' : '0.3s'};
    top: ${props => props.open ? '0px' : '10px'};
    left: ${props => props.open ? '0px' : '10px'};
    width: ${props => props.open ? '100vw' : '25px'};
    height: ${props => props.open ? '100vh' : '25px'};
    border-radius: ${props => props.open ? '0px' : '15px'};
    overflow-y: ${props => props.open ? 'auto' : 'hidden'};
    background: ${props => props.open ? 'rgba(0,0,0,0.3)' : 'var(--text-color)'};

    &:before{
        content: '';
        position: absolute;
        top: ${props => props.open ? '15px' : '5px'};
        left: ${props => props.open ? '15px' : '5px'};
        width: 15px;
        height: 15px;
        transition: all 0.3s;
        transition-delay: ${props => props.open ? '0s' : '0.3s'};
        opacity: ${props => props.open ? '0' : '1'};
        background-image: url(data:image/svg+xml, ${props => encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 803.06 803.06" style="enable-background:new 0 0 803.06 803.06;" xml:space="preserve"><g>	<rect x="316.97" fill="'+document.documentElement.style.getPropertyValue('--back-default')+'" y="661.34" width="108.41" height="118.68"/>	<path fill="'+document.documentElement.style.getPropertyValue('--back-default')+'" d="M552.09,93.47c-27.5-32.13-79.06-70.42-168.47-70.42c-100.86,0-156.56,47.34-185.52,87.06		c-38.44,52.71-44.88,109.8-45.94,126.04l-1.96,30.12h105.9l4.02-23.52c13.32-78.04,52.24-114.39,122.48-114.39		c84.91,0,107.56,65,107.56,103.41c0,38.6-5.3,78.01-69.38,135.5c-91.21,81.22-103.8,141.37-103.8,194.26v41.76h108.41v-35.54		c0-41.69,10.08-71.85,65.2-120.96c42.35-37.77,68.83-69.25,85.86-102.05c17.44-33.59,25.22-68.75,25.22-114.01		C601.66,180.29,583.59,130.27,552.09,93.47z"/></g></svg>')});
        background-size: 15px;
    }
`;

const Content = styled.div`
    width: 100vw;
    max-width: 600px;
    margin: 0 auto;
    min-height: 70vh;
    background-color: var(--color-default);
    box-shadow: 0px 0px 0px 1px var(--border-color);
    position: relative;
    margin-top: 30vh;
    box-sizing: border-box;
    padding: 30px;
    transition: all 0.3s;
    transition-delay: ${props => !props.open ? '0s' : '0.3s'};
    transform: translateY(${props => props.open ? '0vh' : '120vh'});
`;

const Close = styled.div`
    width: 5vh;
    height: 5vh;
    position: absolute;
    top: -7vh;
    right: 2vh;
    cursor: pointer;
    box-shadow: 0px 0px 0px 3px var(--text-color) inset;

    &:before{
        content: '';
        width: 3vh;
        height: 3px;
        position:absolute;
        left: calc(50% - 1.5vh);
        top: calc(50% - 1.5px);
        background: var(--text-color);
        transform: rotate(45deg);
    }

    &:after{
        content: '';
        width: 3vh;
        height: 3px;
        position:absolute;
        left: calc(50% - 1.5vh);
        top: calc(50% - 1.5px);
        background: var(--text-color);
        transform: rotate(-45deg);
    }

    
`;

export default function Help() {
    const [open, setOpen] = useState(false);

    return <>
        <Wrapper open={open} onClick={() => !open ? setOpen(true) : ''}>
            <Content open={open}>
                <Close onClick={() => setOpen(false)} />
                <>
                    <h1>Help and Tips</h1>
                    <Blocks />
                    <Grid />
                    <Platform />
                    <Parallax />
                </>
            </Content>
        </Wrapper>
    </>;
}