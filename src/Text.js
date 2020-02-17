import React, { useState, useContext} from 'react';
import { AnnotationContext } from './AnnotationContext';
import css from './css/popup.css';
import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks';

const CREATE_ANNOTATION = gql`
  mutation createAnnotation($project: ID!, $group: ID!, $timestamp: Int!, $header: String!, $author: String!, $body: String){
    annotationCreate(
      project: $project
      group: $group
      timestamp: $timestamp
      header: $header
      author: $author
      body: $body
      ) {
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
`;
function Text(props) {
  const [createAnnotation, {loading: mutationLoading, error: mutationError}] = useMutation(CREATE_ANNOTATION);
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const context = useContext(AnnotationContext);
  const add = () => {
      createAnnotation(
        { variables: { project : context.projectID, group: props.groupID, timestamp: parseInt(Date.now()/1000), header: header, author: context.user, body: body}
      }).then((data) => {
        context.data.push(data.data.annotationCreate);
        props.addAnnotation(data.data.annotationCreate);
        setBody("");
        setHeader("");
      }).catch((res) => {
      console.log(res);
    });    
  };
  return (
    <div>
      <div className={"inputText"}>
        <textarea value={header} onChange={e => setHeader(e.target.value)} placeholder={"Add title"} className={"firstText"}></textarea><br />
        <hr />
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder={"Add comment"} className={"secoundText"}></textarea>
      </div>
      <button onClick={add} className={"add"}>Add comment</button>
    </div>
  );
}
export default Text;