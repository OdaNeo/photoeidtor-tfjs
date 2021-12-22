import React from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import TuiImageEditor from 'tui-image-editor'

class ImageEditor extends React.Component<tuiImageEditor.IOptions> {
  rootEl = React.createRef<HTMLDivElement>()
  imageEditorInst!: TuiImageEditor

  componentDidMount() {
    this.imageEditorInst = new TuiImageEditor(this.rootEl.current as Element, {
      ...this.props
    })
  }

  componentWillUnmount() {
    this.imageEditorInst.destroy()
  }

  render() {
    return <div ref={this.rootEl} />
  }
}

export default ImageEditor
