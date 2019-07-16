import React from "react";
import styled from 'styled-components';
import { Modifier, EditorState, convertToRaw } from 'draft-js';

const close_icon = require('../../assets/close.png');

const ImageBox = styled.div`
  width: 90%;
  position: relative;

  img.img-media {
    width: 100%;
  }

  .close-icon {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(100, 100, 100, 0.1);

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const Image = props => {
  if (!!props.src) {
    return (
      <ImageBox>
        <img src={props.src} alt="" className="img-media" onClick={() => console.log(2)}/>
        <div className="close-icon" onClick={props.handleClick}>
          <img src={close_icon} />
        </div>
      </ImageBox>
    );
  }
  return null;
};


const Media = props => {
  if (!props.block.getEntityAt(0)) return null;

  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;

  if (type === 'image') {
    const key = props.block.getKey();
    const currentContentState = props.contentState;
    const currentEditorState = props.blockProps.editorState;

    const selection = currentEditorState.getSelection();
    const selectionOfAtomicBlock = selection.merge({
      anchorKey: key,
      anchorOffset: 0,
      focusKey: key,
      focusOffset: props.block.getLength(),
    });

    const contentStateWithoutEntity = Modifier.applyEntity(
      currentContentState, selectionOfAtomicBlock, null
    );
    const editorStateWithoutEntity = EditorState.push(
      currentEditorState, contentStateWithoutEntity, 'apply-entity'
    );

    const contentStateWithoutBlock = Modifier.removeRange(
      contentStateWithoutEntity, selectionOfAtomicBlock, 'backward'
    );
    const newEditorState =  EditorState.push(
      editorStateWithoutEntity, contentStateWithoutBlock, 'remove-range'
    );

    media = <Image
      src={src} 
      blockKey={key}
      handleClick={() => {
        props.blockProps.onChange(newEditorState);
      }}
    />;
  }

  return media;
};


export const mediaBlockRenderer = (block, onChange, editorState) => {

  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
      props: {
        onChange,
        editorState
      },
    };
  }
};



