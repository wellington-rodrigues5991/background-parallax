import React from 'react';
import styled from 'styled-components';
import CustomVcc from '@withkoji/custom-vcc-sdk';
import App from './editor/app';
import Help from './tips/help';

class VCC extends React.PureComponent {
    constructor(props) {
        super(props);

        this.customVcc = new CustomVcc();
        this.update = this.update.bind(this);
        this.showModal = this.showModal.bind(this);
        this.setVar = this.setVar.bind(this);
        const initialValue = {
            count: 0,
            grid: {},
            platform: {},
            block: {},
            panel: undefined,
            blockProps: [
                {title: 'meu angle', type: 'number', opt: {min: 0, max: 360, step: 1}, value: 0}
            ],
            background: {
                status: false,
                data: []
            },
            selection: {
                platform: -1,
                block: -1,
                background: -1
            },
            open: this.showModal   
        };
        this.state = {
            value: null,
            data: null,
            theme: this.customVcc.theme,
        };

        this.customVcc.onUpdate((newProps) => {
            const data = Object.assign({}, initialValue);
            const value = Object.assign({}, newProps.value);

            if(typeof value != 'object') value = {}

            if(value.grid != undefined) data.grid = value.grid;

            if(value.platforms != undefined){
                if(data.platform.movable == undefined) data.platform.movable = {};
                data.platform.movable.platform = value.platforms;
            }

            if(value.blocks != undefined){
                if(data.block.movable == undefined) data.block.movable = {};
                data.block.movable.blocks = value.blocks;
            }
            if(value.background != undefined) data.background.data = value.background;
            if(value.blockProps != undefined) data.blockProps = value.blockProps;

            if(this.state.value != data) this.setState({data: data, value: newProps})   
        });

        this.customVcc.onTheme((theme) => {
            this.setState({
                theme
            });
        });
    }

    setVar(key, val){
        document.documentElement.style.setProperty(key, val)
    }

    componentDidMount() {
        this.customVcc.register('500px', '534px');

        let border = this.state.theme.colors['border.secondary'];
        let font = this.state.theme.mixins['font.defaultFamily'];

        if(border != undefined) border = border.replace(';', '');
        if(font != undefined) font = font.replace('font-family: ', '').replace(';', '');

        this.setVar('--text-color', this.state.theme.colors['foreground.default']);
        this.setVar('--color-primary', this.state.theme.colors['input.background']);
        this.setVar('--back-default', this.state.theme.colors['border.default']);
        this.setVar('--back-secundary', this.state.theme.colors['foreground.secondary']);
        this.setVar('--color-secundary', this.state.theme.colors['foreground.primary']);
        this.setVar('--border-color', border);
        this.setVar('--color-base', this.state.theme.colors['background.default']);
        this.setVar('--font-family', font);
        this.setVar('--color-default', this.state.theme.colors['background.default']);
    }

    componentWillUpdate(){
        let border = this.state.theme.colors['border.secondary'];
        let font = this.state.theme.mixins['font.defaultFamily'];

        window.Theme = this.state.theme;

        if(border != undefined) border = border.replace(';', '');
        if(font != undefined) font = font.replace('font-family: ', '').replace(';', '');

        this.setVar('--text-color', this.state.theme.colors['foreground.default']);
        this.setVar('--color-primary', this.state.theme.colors['input.background']);
        this.setVar('--back-default', this.state.theme.colors['border.default']);
        this.setVar('--back-secundary', this.state.theme.colors['foreground.secondary']);
        this.setVar('--color-secundary', this.state.theme.colors['foreground.primary']);
        this.setVar('--border-color', border);
        this.setVar('--color-base', this.state.theme.colors['background.default']);
        this.setVar('--font-family', font);
        this.setVar('--color-default', this.state.theme.colors['background.default']);
    }

    showModal(callback){
        this.customVcc.showModal('image', '', newUrl => callback(newUrl));
    }

    update(props){
        const data = {
            grid: props.grid,
            platforms: props.platform == undefined ? [] : props.platform.movable == undefined ? [] : props.platform.movable.platform,
            blocks: props.block == undefined ? [] : props.block.movable == undefined ? [] : props.block.movable.blocks,
            background: props.background.data,
            blockProps: props.blockProps
        }

        this.customVcc.change(data);
        this.customVcc.save();
    }

    render() {
        return <>
            <App mailer={this.state.data} setMailer={this.update} />
            <Help />
        </>;
    }
}

export default VCC;
