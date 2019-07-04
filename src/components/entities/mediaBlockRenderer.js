import React from "react";


const Image = props => {
  if (!!props.src) {
    return <img src={props.src} alt="" style={{maxWidth: '90%'}} />;
  }
  return null;
};


const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;

  if (type === 'image') {
    media = <Image src={src} />;
  }

  return media;
};


export const mediaBlockRenderer = block => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
      props: {
        foo: 'bar'
      },
    };
  }
};



