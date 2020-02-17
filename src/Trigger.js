import React from 'react';
import PropTypes from 'prop-types';
import {AnnotationContext} from './AnnotationContext';
import Popup from './Popup';

const defaultProps = {
    styles: {
        label: {
            fontFamily: 'Comic Sans MS',
            color: 'green'
        },
        input: {
            background: '#ddd',
            border: '1px solid red'
        },
        orangeBorder: {
            display: 'inline-block',
            border: '2px solid #f75832',
            position: 'relative',
        },
        orangeTriangle: {
            right: 0,
            bottom: 0,
            position: 'absolute',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 0 40px 40px',
            borderColor: 'transparent transparent #f75832', 
            cursor: 'pointer',
        },
        greyTriangle: {
            right: 0,
            bottom: 0,
            position: 'absolute',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 0 40px 40px',
            borderColor: 'transparent transparent #c2c6d1',
            cursor: 'pointer',
        },
        numberTriangle: {
            position: 'absolute',
            left: '-19px',
            top: '18px',
            color: 'white',
            fontSize: '15px',
        }


    }
}

class Trigger extends React.Component {
    constructor(props) {
        super(props);
        this.onClickButton2 = this.onClickButton2.bind(this);
        this.counter = this.counter.bind(this);
        this.state = {
            isBorder : true,
            isOpen: false,
            annotationNumber: 0
        }
    }
    componentDidMount() {
        this.counter();

    }
    counter() {
        let value = this.context;
        let counter = 0;
        value.data.forEach(element => {
            if(this.props.groupID == element.groupID) {
                counter++;
            }
        });
        if(value.isOpen == this.props.groupID) {
            this.setState({isOpen : true});
        }else {
            this.setState({isOpen : false});
        }
        this.setState({
            annotationNumber: counter
        })
    }
    onClickButton2(e) {
        this.setState(
            {isOpen: true}
        )
        this.context.openPopup(this.props.groupID);
    }
    render() {
        const styles = this.props.styles || {};
        let triangle;
        let popup = null;
        let value = this.context;
        if(this.state.annotationNumber) {
            triangle =  <div onClick={this.onClickButton2} style={styles.orangeTriangle}>
                            <div style={styles.numberTriangle}>{this.state.annotationNumber}</div>
                        </div>
        } else {
            triangle =  <div onClick={this.onClickButton2} style={styles.greyTriangle}>
                            <div style={styles.numberTriangle}>+</div>
                        </div>
        }
        if(value.dev == false) return this.props.children;
        return (
            <div style={{display:'inline-block', position:'relative'}}>
                <span style={this.state.isBorder ? styles.orangeBorder: null}>
                    {this.props.children}
                    {triangle}
                </span>
                <AnnotationContext.Consumer>
                    {value => (
                    (value.isOpen == this.props.groupID) ? <Popup counter={this.counter} groupID={this.props.groupID}/> : null
                        )
                    }
                </AnnotationContext.Consumer>
            </div>
        );
    }
}
Trigger.contextType = AnnotationContext;
Trigger.defaultProps = defaultProps;
export default Trigger;