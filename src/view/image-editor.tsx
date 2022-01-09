import ImageEditor from '../components/imageEditor'

const ImageEditorFC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      }}
    >
      <ImageEditor
        includeUI={{
          uiSize: {
            width: '1200px',
            height: '700px'
          },
          menuBarPosition: 'bottom'
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70
        }}
      />
      <span
        style={{
          marginTop: '12px'
        }}
      >
        Upload/Download, ZoomIn/Out, Resize, Clop, Rotate, Text/Draw,
        Filter(All), Undo/Redo
      </span>
    </div>
  )
}

export default ImageEditorFC
