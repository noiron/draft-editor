import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icons from './Icons';

const BarBox = styled.div`
  width: 100%;
  height: 24px;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  .Icon {
    width: 24px;
    height: 24px;
    fill: #999;
  } 
`;

const Button = styled.span`
  margin-right: 5px;
`;

const ToolBar = props => {

  return (
    <BarBox>
      <Button onClick={props.onBoldClick}><Icons.bold /></Button>
      <Button onClick={props.onLinkClick}><Icons.link /></Button>
    </BarBox>
  )
}


ToolBar.propTypes = {
  onBoldClick: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
}

export default ToolBar;
