import React from 'react';
import {
  Editor, EditorState,
} from 'draft-js';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';

const Container = styled.div`
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ccc;
  text-align: left;
  max-width: 600px;
  width: 90%;
  position: relative;
`;

const EditorBox = styled.div`
  min-height: 400px;
`;

class MyEditor extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  }


  render() {
    return (
      <Container>

        <EditorBox>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </EditorBox>
      </Container>
    )
  }
}

export default MyEditor;


