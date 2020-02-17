import React, {useState, useContext} from 'react';
import { AnnotationContext } from './AnnotationContext';
import css from './css/PopupItem.css';
import ok from './img/ok.svg';
import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment'

const RESOLVE_ANNOTATION = gql`
  mutation resolveAnnotation($id: ID!, $isRes: Boolean){
    annotationUpdate(
      id: $id
      isResolved: $isRes
      ) {
        id
        timestamp
      }  
}
`;
function PopupItem(props) {
  const context = useContext(AnnotationContext);
  const [resolveAnnotation, {loading: mutationLoading, error: mutationError}] = useMutation(RESOLVE_ANNOTATION);
  const [resolveAnnot, setResolve] = useState(props.data.isResolved);
  const onClickResolve = () => {
    resolveAnnotation({ variables: { id : props.data.id, isRes : !resolveAnnot }}).catch((res) => {
      console.log(res);
    });
    for( let i = 0; i < context.data.length; i++ ) {
      if(context.data[i].id == props.data.id) {
        context.data[i].isResolved = !resolveAnnot;
      }
    }
    setResolve(!resolveAnnot);

  }
  let img = "https://api.adorable.io/avatars/40/" + encodeURI(props.data.author);
  let borderColor = resolveAnnot ? "popupItem popupItemOk" : "popupItem";
  return (
      <div className={borderColor}>
        <img src={img} />
        {resolveAnnot ? <span className={"ok"} onClick={onClickResolve} dangerouslySetInnerHTML={{ __html: ok }} /> : <span onClick={onClickResolve} className={"resolve"}></span>}
        <span className={"time"}>{moment.unix(props.data.timestamp).format("HH:mm")}</span><br />
        <span>{props.data.author}</span><br />
        <span className={"title"}>{props.data.header}</span><br />
        <span>{props.data.body}</span>
      </div>    
  )
}
export default PopupItem;