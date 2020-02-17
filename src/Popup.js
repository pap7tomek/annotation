import React from 'react';
import { AnnotationContext } from './AnnotationContext';
import hide from './img/hide-svgrepo-com.svg';
import PopupItem from './PopupItem'
import Text from './Text';
import css from './css/popup.css';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.addAnnotation = (data) => {
      let value = this.context;
      this.setState({
        annotations: [...this.state.annotations, data],
      })
      this.props.counter();
      console.log(value.projectID);
    }
    this.state = {
      annotations: []
    }
    this.closePopup = this.closePopup.bind(this);
    this.addAnnotation = this.addAnnotation.bind(this);
  }

  componentDidMount() {
    let value = this.context;
    console.log('values', value.data);
    for (let i = 0; i < value.data.length; i++) {
      if (value.data[i].groupID == this.props.groupID) {
        this.setState(prevState => ({
          annotations: [...prevState.annotations, value.data[i]]
        })

        )
      }
    }
  }
  closePopup() {
    this.context.closePopup();
  }
  render() {
    const styles = this.props.styles || {};
    let key = 0;
    const items = this.state.annotations.map((annotation) => {
        key++;
        return <PopupItem key={key} data={annotation} />
      }
    )
    return (
      <div style={{ display: 'inline-block' }}>
        <br />
        <div className={"popup"}>
          <div><span className={"completed"} dangerouslySetInnerHTML={{ __html: hide }} /><span className={"textCompleted"}>Hide completed</span></div>
          <div onClick={this.context.closePopup} className={"closePopup"}>x</div>
          {items}
          <Text addAnnotation={this.addAnnotation} groupID={this.props.groupID} />
          <button onClick={this.context.closePopup} className={"cancel"}>Cancel</button>
        </div>
      </div>
    );
  }
}
Popup.contextType = AnnotationContext;
export default Popup;