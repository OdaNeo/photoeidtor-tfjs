import React from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import TuiImageEditor from "tui-image-editor";

class ImageEditor extends React.Component<tuiImageEditor.IOptions> {
  rootEl = React.createRef<HTMLDivElement>();

  imageEditorInst!: TuiImageEditor;
  async componentDidMount() {
    this.imageEditorInst = new TuiImageEditor(this.rootEl.current as Element, {
      ...this.props,
    });
  }

  componentWillUnmount() {
    this.imageEditorInst.destroy();
  }

  render() {
    return <div ref={this.rootEl} />;
  }
}

const ImageEditorFC = () => {
  return (
    <>
      <ImageEditor
        includeUI={{
          uiSize: {
            width: "1200px",
            height: "700px",
          },
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
      />
      <div
        style={{
          marginTop: "12px",
        }}
      >
        Upload/Download, ZoomIn/Out, Resize, Clop, Rotate, Text/Draw,
        Filter(All), Undo/Redo
      </div>
    </>
  );
};

export default ImageEditorFC;
