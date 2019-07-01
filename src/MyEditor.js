import React from 'react';
import {
  Editor, EditorState, RichUtils
} from 'draft-js';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';
import ToolBar from './components/tool-bar';

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

  componentDidMount() {
    this.focus();
  }

  setDomEditorRef = ref => this.domEditor = ref;

  focus = () => {
    this.domEditor.focus();
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  }

  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onLinkClick = () => {
    console.log('Click on link');
  }

  render() {
    return (
      <Container>
        <ToolBar
          onBoldClick={this._onBoldClick}
          onLinkClick={this._onLinkClick}
        />

        <EditorBox>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Please input here..."
            ref={this.setDomEditorRef}
          />
        </EditorBox>
      </Container>
    )
  }
}

export default MyEditor;


