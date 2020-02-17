import React from 'react';
import styled from 'styled-components';
import CustomVcc from '@withkoji/custom-vcc-sdk';
import App from './app';

class VCC extends React.PureComponent {
    constructor(props) {
        super(props);

        this.customVcc = new CustomVcc();
        this.update = this.update.bind(this);
        this.showModal = this.showModal.bind(this);
        this.setVar = this.setVar.bind(this);
        this.option = {            
            open: true,
            select: -1,
            speed: 1,
            direction: 0
        };
        const initialValue = {
            data: [],    
        };
        this.state = {
            value: null,
            data: null,
            theme: this.customVcc.theme,
        };

        this.customVcc.onUpdate((newProps) => {
            const data = Object.assign({}, initialValue);
            const value = Object.assign({}, newProps.value);

            data.open = this.option.open;
            data.select = this.option.select;
            data.speed = this.option.speed;
            data.direction = this.option.direction;
            if(value.data != undefined) data.data = value.data;  
            
            this.setState({data: data, value: newProps})   
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
        this.option = {
            open: props.open,
            select: props.select,
            speed: props.speed,
            direction: props.direction
        }

        this.customVcc.change({data: props.data});
        this.customVcc.save();
    }

    render() {
        return <>
            {this.state.data != null && <App data={this.state.data} setData={this.update} open={this.showModal} /> }
        </>;
    }
}

export default VCC;
