/**
 * 图片上传组件，点击图标后选择图片进行上传
 */
import React from 'react';
import styled from 'styled-components';
import Icons from './../tool-bar/Icons';


const UploaderBox = styled.div`
  img.upload-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  input {
    display: none;
  }
`;

class ImageUploader extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      imageList: [],
    };
  }

  // 点击上传图片图标的时候触发上传图片
  handleIconClick = (e) => {
    if (this.input.files) {
      this.input.click();
    }
  }

  handleInputClick = (e) => {
    e.stopPropagation();
  }

  handleInputChange = async () => {
    const files = this.input.files || [];

    if (files.length > 0) {
      const file = files[0];  
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;
        this.props.insertImage(src);
      };
      reader.readAsDataURL(file);
    }
  }


  render() {
    return (
      <UploaderBox className="image-uploader">
        <div onClick={this.handleIconClick}>
          <Icons.image />
        </div>
        <input
          ref={e => this.input = e}
          type="file"
          accept="image/*"
          onClick={this.handleInputClick}
          onChange={this.handleInputChange}
          multiple={false}
        />
      </UploaderBox>
    );
  }
}


export default ImageUploader;