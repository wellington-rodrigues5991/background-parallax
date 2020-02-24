import React, {useState, useRef} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    background: var(--grid-back);
    background-size: 18px;
`;

const Content = styled.div`
    transform: ${props => props.open ? 'rotateY(30deg) skewY(-15deg) translateZ(150px) scale(0.4) translateY(-150px)' : 'scale(0.6) translateY(-90px)'};
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    transform-style: preserve-3d;
    transition: all 0.5s;
`;

const Background = styled.div`
    background: url(${props => props.color});
    transform: translateZ(${props => (1 - props.depth) * -300}px);
    width: 100%;
    height: 100%;
    background-size: auto 100% !important;
    background-position: 0px 0px;
    position: absolute;
    top: 0px;
    left: 0px;
`;

const Button = styled.div`
    width: 50px;
    height: 100px;
    position: fixed;
    right: 10px;
    bottom: 10px;
    border: 1px solid var(--border-color);
    border-top: none;
    background: var(--color-base);
`;

const Btn = styled.div`
    width: 50px;
    height: 49px;
    border-top: 1px solid var(--border-color);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:before{
        transform: ${props => props.type != 0 ? 'rotate(45deg)' : 'none'};
        background: ${props => {
            if(props.type == 0) return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 349.01 349.01" style="enable-background:new 0 0 349.01 349.01;" xml:space="preserve"><polygon fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" points="0,349 0,0 349,175.5 "/></svg>')+')';
            else return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M19,6.4L17.6,5L12,10.6L6.4,5L5,6.4l5.6,5.6L5,17.6L6.4,19l5.6-5.6l5.6,5.6l1.4-1.4L13.4,12L19,6.4z"/></svg>')+')'
        }};
        background-size: ${props => props.type == 0 ? '15px auto' : '20px auto'};
        background-position: center;
        background-repeat: no-repeat;
        content: '';
        width: 25px;
        height: 25px;
`;

const Bar = styled.div`
    width: calc(100% - 70px);
    height: 100px;
    position: fixed;
    left: 10px;
    bottom: 10px;
    border: 1px solid var(--border-color);
    border-right: none;
    background: var(--color-base);
    overflow: auto;
`;

const Inner = styled.div`
    width: ${props => props.size * 90}px;
    min-width: 80px;
    height: 80px;
    margin-top: 10px;
    margin-left: 10px;
    display: flex
`;

const Icon = styled.div`
    box-shadow: ${props => props.select ? '0px 0px 0px 3px var(--color-secundary)' : 'none'};
    background: url(${props => props.color});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 80px;
    height: 80px;
    margin-right: 10px;
`;

const Context = styled.div`
    transition: ${props => props.selection == -1 ? 'bottom 0.1s 0.3s, opacity 0.3s' : 'bottom 0.5s, opacity 0.3s 0.35s'};
    bottom: ${props => props.selection > -1 ? '130px' : '-100vh'};
    opacity: ${props => props.selection > -1 ? '1' : '0'};
    height: 50px;
    background: var(--text-color);
    border-radius: 15px;
    position: fixed;
    width: 300px;
    left: calc(50% - 150px);
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
    padding: 5px;

    & input[type=range]{
        -webkit-appearance: none;
        appearance: none;
        padding: 0px;
        height: 6px;
        outline: none;
        border-radius: 4px;
        background: var(--color-base); 
        width: 200px !important;
        margin-right: 10px !important;
        margin-left: 10px !important;
        margin-top: 30px;
    }

    & input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        cursor: pointer;
        background: var(--color-secundary);
    }
`;

const Action = styled.div`
    width: ${props => props.type != 'input' ? '40px' : '120px'};
    margin-left: ${props => props.type == 'none' ? '10px' : '0px'};
    height: 40px;
    line-height: 40px;
    padding-left: ${props => props.type != 'null' ? '40px' : '0px'};
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.5s;
    color: var(--color-base) !important;
    text-align: center;
    font-size: 16pt;

    &:hover{background: rgba(0,0,0,0.2)}

    &:before{
        background-image: ${ props => {
            if(props.type == 'remove') return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--color-base')+'" d="M6,19c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V7H6V19z M19,4h-3.5l-1-1h-5l-1,1H5v2h14V4z"/></svg>')+')'
            if(props.type == 'none') return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--color-base')+'" d="M19,6.4L17.6,5L12,10.6L6.4,5L5,6.4l5.6,5.6L5,17.6L6.4,19l5.6-5.6l5.6,5.6l1.4-1.4L13.4,12L19,6.4z"/></svg>')+')'
            if(props.type != 'null') return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><polygon fill="'+document.documentElement.style.getPropertyValue('--color-base')+'" points="0,888.13 0,1120.03 245.54,1120.03 934.43,431.14 695.71,192.42 	"/><path fill="'+document.documentElement.style.getPropertyValue('--color-base')+'" d="M1105.42,151.96L973.04,19.58c-25.38-25.38-66.26-26.19-92.63-1.85l-79,72.92c-3.73,3.45-6.9,7.25-9.66,11.26l-41.47,35.94 l231.9,231.9l95.49-95.49l0,0l27.75-27.75C1131.53,220.41,1131.53,178.07,1105.42,151.96z"/></g></svg>')+')'
        }};
        background-size: ${ props => props.type == 'remove' ? 'auto 25px' : 'auto 20px'};
        background-position: ${ props => props.type == 'remove' ? '2.5px center' : '5px center'};
        background-repeat: no-repeat;
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        width: 30px;
        height: 30px;
    }
`;

const Range = styled.div`
    width: 140px;
    position: absolute;
    top: 7px;
    left: 15px;
    color: var(--color-base) !important;

    & input{
        float: right;
        width: 80px;
        padding: 0px;
        margin: 0px;
        border: none;
        text-align: right;
        color: var(--color-base) !important;
        font-size: 12pt;
        background: none;
        outline: none
    }
`;

export default function App({data, setData, open}) {
    const range = useRef();
    const number = useRef();
    const range2 = useRef();
    const number2 = useRef();

    const Add = () => {
       open(url => {
           const d = data.data.slice();
       
            d.push({image: url, depth: 0})

            number.current.value = 0;
            range.current.value = 0;
            Update(['data', 'select'], [d, d.length-1])
       })
    }

    const Edit = () => {
        open( url => {
            const d = data.data.slice();

            d[data.select].image = url;
            Update('data', d)
        })
    }

    const Change = val => document.getElementsByClassName('content')[0].children[data.select].style.transform = 'translateZ('+(1 - val) * -300+'px)'

    const Finished = val => {
        const d = data.data.slice();
        
        d[data.select].depth = val;
        
        Update('data', d)
    }

    const Select = id => {
        number.current.value = data.data[id].depth;
        range.current.value = data.data[id].depth;
        Update('select', id)
    }

    const Delete = () => {
        const d = [];

        for(let i = 0; i < data.data.length; i++){
            if(i != data.select) d.push(data.data[i]);
        }
        Update(['data', 'select'], [d, -1])
    }

    const Play = () => {
        Update('open', !data.open)
        if(!data.open == false){
            requestAnimationFrame(() => Loop());
            window.pause = false;
        }
        else window.pause = true;
    }
    const Loop = () => {
        if(window.pause != true){
            const children = document.getElementsByClassName('content')[0].children;

            for(let i = 0; i < children.length; i++){
                let dir = children[i].style.backgroundPosition;
                dir = dir.length == 0 ? '0px 0px' : dir;
                dir = dir.split(' ');

                let temp = [];
                temp[0] = parseFloat(dir[0]);
                temp[1] = parseFloat(dir[1]);
                temp[window.data.direction] = temp[window.data.direction] + (parseFloat(window.data.speed) * data.data[i].depth);

                children[i].style.backgroundPosition = temp[0]+'px '+temp[1]+'px';
            }

            requestAnimationFrame(() => Loop());
        }
    }

    const Update = (key, value) => {
        const d = Object.assign({}, data);

        if(!Array.isArray(key)) d[key] = value;
        else{
            for(let i = 0; i < key.length; i++){
                d[key[i]] = value[i]
            }
        }

        window.data = d;
        setData(d);
    }    

    if(data.select >= 0){
        //console.log(range.current != undefined, parseFloat(data.data[data.select].depth), data.data[data.select].depth)
        if(range.current != undefined) range.current.value = parseFloat(data.data[data.select].depth);
        if(number.current != undefined) number.current.value = parseFloat(data.data[data.select].depth);
    }

    return <Wrapper>
        <Content open={data.open} className="content">
            {data.data.map((value, key) => <Background key={key} color={value.image} depth={value.depth} />)}
        </Content>
        <Button>
            <Btn onClick={Add} />
            <Btn onClick={Play} type={0} />
        </Button>
        <Bar>
            <Inner size={data.data.length}>{data.data.map((value, key) => <Icon
                key={key} 
                color={value.image} 
                select={data.select == key}
                onClick={()=> Select(key)}
            />)}</Inner>
        </Bar>

        <Context selection={data.open ? data.select : -1}>
            <Range>
                Depth
                <input 
                    ref={number} 
                    type="number" 
                    defaultValue={data.select >= 0 ? data.data[data.select].depth : 0} 
                    onBlur={e => Finished(e.target.value)}
                    onChange={e => {
                        range.current.value = number.current.value;
                        Change(e.target.value);
                    }}
                />
            </Range>
            <input 
                ref={range} 
                type="range" min="0" max="1" step="0.01" 
                defaultValue={data.select >= 0 ? data.data[data.select].depth : 0}
                onMouseUp={e => Finished(e.target.value)}
                onTouchEnd={e => Finished(e.target.value)}
                onChange={e => {

                    range.current.value = parseFloat(e.target.value);
                    number.current.value = parseFloat(e.target.value);
                    Change(parseFloat(e.target.value));

                    
                    window.data.speed = parseFloat(e.target.value);
                    console.log(e.target.value)
                }}
            />
            <Action onClick={Edit} />
            <Action type="remove" onClick={Delete} />
            <Action type="none" onClick={() => Update('select', -1)} />
        </Context>

        <Context selection={!data.open ? 0 : -1}>
            <Range style={{width: '190px'}}>
                Speed
                <input 
                    ref={number2} 
                    type="number" 
                    defaultValue={parseFloat(data.select >= 0 ? data.data[data.select].depth : 0)} 
                    onBlur={e => Update('speed', window.data.speed)}
                    onChange={e => {
                        range2.current.value = parseFloat(e.target.value);
                        number2.current.value = parseFloat(e.target.value);
                        window.data.speed = parseFloat(e.target.value);
                    }}
                />
            </Range>
            <input 
                ref={range2} 
                type="range" min="-10" max="10" step="1" 
                defaultValue={parseFloat(data.select >= 0 ? data.data[data.select].depth : 0)}
                onMouseUp={e => Update('speed', window.data.speed)}
                onTouchEnd={e => Update('speed', window.data.speed)}
                onChange={e => {
                    console.log(e, range2.current.value, number2.current.value)

                    range2.current.value = parseFloat(e.target.value);
                    number2.current.value = parseFloat(e.target.value);

                    
                    window.data.speed = parseFloat(e.target.value);
                }}
            />
            <Action type="null" onClick={() => Update('direction', 0)}>x</Action>
            <Action type="null" onClick={() => Update('direction', 1)}>y</Action>
        </Context>

    </Wrapper>;
}

window.data = {
    speed: 1,
    direction: 0
}