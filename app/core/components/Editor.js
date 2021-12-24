import dynamic from 'next/dynamic'

const Editor = dynamic(
  async () => {
    const ace = await require('react-ace');
    require('ace-builds/webpack-resolver');
    require("ace-builds/src-noconflict/ext-language_tools");
    require('ace-builds/src-noconflict/mode-html');
    require('ace-builds/src-noconflict/theme-twilight');
    require('ace-builds/src-noconflict/ext-emmet');
    return ace;
  },
  {
    // eslint-disable-next-line react/display-name
    loading: () => (
      <p>Loading...</p>
    ),
    ssr: false,
  },
);

function CodeEditor(props) {
  return (
    <>
      {/* figure out how to load this better */}
      <script src="https://cloud9ide.github.io/emmet-core/emmet.js"></script>
      <Editor
          {...props}
          mode="html"
          theme="twilight"
          onChange={props.editorUpdate}
          name="editor01"
          fontSize={21}
          wrapEnabled={true}
          defaultValue={props.content}
          setOptions={{
            useWorker: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            enableEmmet: true,
          }}
      />
    </>
  );
}

export default CodeEditor;
