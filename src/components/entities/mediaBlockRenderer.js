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
        <img src={props.src} alt="" className="img-media" />
        <div className="close-icon" onClick={props.handleDelete}>
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

    media = <Image
      src={src} 
      blockKey={key}
      handleDelete={() => {
        props.blockProps.deleteImage(props.block);
      }}
    />;
  }

  return media;
};


export const mediaBlockRenderer = (block, { deleteImage }) => {

  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
      props: {
        deleteImage
      },
    };
  }
};



