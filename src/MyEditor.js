import React from 'react';
import {
  EditorState, RichUtils, convertToRaw
} from 'draft-js';
import Editor from "draft-js-plugins-editor";
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';
import ToolBar from './components/tool-bar';
import addLinkPlugin from './plugins/addLinkPlugin';

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
    };

    this.plugins = [
      addLinkPlugin
    ];
  }

  componentDidMount() {
    this.focus();
  }

  setDomEditorRef = ref => this.domEditor = ref;

  focus = () => {
    setTimeout(() => this.domEditor.focus(), 0);
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  }

  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  addLink = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt('Input the link here: ');

    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled';
    }

    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
    const newEditorState = EditorState.push(
      editorState, contentWithEntity, 'create-entity'
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();

    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return 'handled';
  }

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  logState = () => {
    const content = this.state.editorState.getCurrentContent();
    console.log(convertToRaw(content));
  }

  render() {
    return (
      <Container>
        <ToolBar
          onBoldClick={this._onBoldClick}
          onLinkClick={this.addLink}
        />

        <EditorBox>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Please input here..."
            ref={this.setDomEditorRef}
            plugins={this.plugins}
          />
        </EditorBox>
      </Container>
    );
  }
}

export default MyEditor;


