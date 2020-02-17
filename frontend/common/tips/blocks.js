import React from 'react';
import styled from 'styled-components';

const Icon = styled.div`
    width: 40px;
    height: 40px;
    background-color: ${props => props.select == parseInt(props.type) ? 'var(--color-primary)' : 'transparent' };
    background-image: url(data:image/svg+xml, ${props => {
        if(props.type == '0') return encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M1045,80v960H80V80H1045 M1125,0H0v1120h1125V0L1125,0z"/></g></svg>');
        else if(props.type == '1') return encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M0,0v301v819h1125V301V0H0z M1045,1040H80V381h965V1040z M80,301V80h965v221H80z"/></g></svg>');
        else if(props.type == '2') return encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M602.5,0h-80H0v1120h522.5h80H1125V0H602.5z M1045,80v440H602.5V80H1045z M522.5,80v440H80V80H522.5z M80,1040V600h442.5 v440H80z M602.5,1040V600H1045v440H602.5z"/></g></svg>');
        else if(props.type == '3') return encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M819,0H0v301v518v301v0h306h819V819V301V0v0H819z M739,739H386V381h353V739z M819,381h226v358H819V381z M386,1040V819h353 v221H386z M306,739H80V381h226V739z M386,301V80h353v221H386z M80,80h226v221H80V80z M306,819v221H80V819H306z M1045,1040H819V819 h226V1040z M819,301V80h226v221H819z"/></g></svg>');
    }});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    float: left;
`;

const Wrapper = styled.ul`
    margin: 0px;
    padding: 0px;
    list-style: none;

    & li{
        padding-bottom: 30px;
        min-height: 40px;
    }
    & li:last-child{
        padding-bottom: 0px;
    }
`;

const Content = styled.div`
    margin-top: 5px;
    margin-left: 60px;

    & pre{
        padding: 10px !important;
        border: none;
    }

    & code{
        white-space: pre-wrap;
    }
`;

export default function Blocks(){
    return <>
        <h3>BLOCKS</h3>
        <p>The blocks are divided into parts, these parts are divided into two groups: fixed sizes and flexible sizes</p>

        <h4>Tipos de Blocks</h4>
        <Wrapper>
            <li>
                <Icon type="0" />
                <Content>
                    <p>The first type consists of a single flexible part</p>
                </Content>
            </li>
            <li>
                <Icon type="1" />
                <Content>
                    <p>The second is composed of two parts, the upper one is flexible in width and fixed in height, while the second one is completely flexible</p>
                </Content>
            </li>
            <li>
                <Icon type="2" />
                <Content>
                    <p>The third is composed of four parts, all fully flexible anchored in the center of the block</p>
                </Content>
            </li>
            <li>
                <Icon type="3" />
                <Content>
                    <p>Finally, the most complex and most common to games, in the four corners are totally fixed parts, on the sides and upper and lower parts are flexible parts in a single direction, in the center a fully flexible block</p>
                </Content>
            </li>
        </Wrapper>
    </>;
}