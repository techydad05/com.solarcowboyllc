import dynamic from 'next/dynamic'

const Editor = dynamic(
  async () => {
    const ace = await import('react-ace');
    import('ace-builds/src-noconflict/mode-javascript');
    import('ace-builds/src-noconflict/theme-twilight');
    import('ace-builds/src-noconflict/ext-emmet');
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
      <Editor
          {...props}
          mode="javascript"
          theme="twilight"
          onChange={(e) => { console.log(e) }}
          name="editor01"
          fontSize={21}
          enableEmmet={true}
      />
  );
}

export default CodeEditor;
