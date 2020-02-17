import React from 'react';
import PropTypes from 'prop-types';
import { AnnotationContext } from './AnnotationContext';
import Trigger from './Trigger';
import ApolloClient from 'apollo-boost';
import fetch from 'unfetch';
import { gql } from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';

const propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object
}

const defaultProps = {
  styles: {
    label: {
      fontFamily: 'Comic Sans MS',
      color: 'green'
    },
    input: {
      background: '#ddd',
      border: '1px solid red'
    }
  }
}

class WrapperComponent extends React.Component {
  constructor(props) {
    super(props);

    this.client = new ApolloClient({
      //fetchOptions: { fetch },
      uri: 'https://bddqhqjlg5.execute-api.eu-central-1.amazonaws.com/dev',
      headers: {
        "x-api-key": this.props.apiKey
      }
    });

    this.openPopup = (id) => {
      this.setState({
        isOpen: id
      })
    }
    this.closePopup = () => {
      this.setState({
        isOpen: null
      })
    }
    this.updateData = (projectID) => {
      this.client
        .query({
          query: gql`
                {
                  annotations{
                    id
                    timestamp
                    header
                    author
                    body
                    isResolved
                    groupID
                    projectID
                  }
                }
                `
        })
        .then(result => {
          console.log("update");
          let data = [];
          for (let i = 0; i < result.data.annotations.length; i++) {
            if (result.data.annotations[i].projectID == projectID) {
              data.push(result.data.annotations[i]);
            }
          }
          this.setState({
            data: data,
            loaded: true,
          })
        });
    }
    this.state = {
      loaded: false,
      data: [],
      isOpen: 0,
      openPopup: this.openPopup,
      closePopup: this.closePopup,
      updateData: this.updateData,
      dev: this.props.dev,
      projectID: this.props.projectID,
      user: this.props.user,

    }
    this.updateData = this.updateData.bind(this);
  }
  componentDidMount() {
    this.updateData(this.state.projectID);
  }
  render() {
    const styles = this.props.styles || {};
    let body = this.props.dev ? this.state.loaded && <ApolloProvider client={this.client}><AnnotationContext.Provider value={this.state}>{this.props.children}</AnnotationContext.Provider></ApolloProvider> : <AnnotationContext.Provider value={this.state}>{this.props.children}</AnnotationContext.Provider>;

    return (
      <div>
        {body}
      </div>
    );
  }
}

WrapperComponent.propTypes = propTypes;
WrapperComponent.defaultProps = defaultProps;

export { WrapperComponent, Trigger };