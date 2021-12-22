import React from 'react'
import * as tf from '@tensorflow/tfjs'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const MODEL_URL = 'model.json'

class RemoveBgML extends React.Component<tuiImageEditor.IOptions> {
  photoEl = React.createRef<HTMLCanvasElement>()
  modelEl = React.createRef<HTMLCanvasElement>()
  model!: tf.GraphModel
  async componentDidMount() {
    this.model = await tf.loadGraphModel(MODEL_URL)
  }

  handleUpload = (file: File) => {
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.drawToCanvas(reader.result as string)
      }
    }
    return false
  }

  drawToCanvas(imgData: string) {
    const cvs = this.photoEl.current
    if (cvs) {
      cvs.width = 400
      cvs.height = 300
      const ctx = cvs.getContext('2d')
      const img = new Image()
      img.src = imgData
      img.onload = () => {
        ctx?.drawImage(img, 0, 0, 400, 300)
        this.ml(img)
      }
    }
  }

  async ml(imgData: HTMLImageElement) {
    const canvas = this.modelEl.current
    if (canvas) {
      // Set initial recurrent state

      // Set down_sample ratio
      const downsample_ratio = tf.tensor(0.5)

      const src = this.img2tenser(imgData)
      let [r1i, r2i, r3i, r4i] = [
        tf.tensor(0),
        tf.tensor(0),
        tf.tensor(0),
        tf.tensor(0)
      ]
      const cb = await this.model.executeAsync(
        { src, r1i, r2i, r3i, r4i, downsample_ratio }, // provide inputs
        ['fgr', 'pha', 'r1o', 'r2o', 'r3o', 'r4o'] // select outputs
      )
      if (Array.isArray(cb)) {
        const [fgr, pha] = cb
        this.drawMatte(fgr.clone(), pha.clone(), canvas)
        canvas.style.backgroundColor = 'rgb(120, 255, 155)'
        tf.dispose([src, fgr, pha, r1i, r2i, r3i, r4i])
        tf.dispose(cb)
      }
    }
  }

  async drawMatte(
    fgr: tf.Tensor<tf.Rank>,
    pha: tf.Tensor<tf.Rank>,
    canvas: HTMLCanvasElement
  ) {
    const rgba = tf.tidy(() => {
      const rgb = fgr.squeeze([0]).mul(255).cast('int32')
      const a = pha.squeeze([0]).mul(255).cast('int32')
      return tf.concat([rgb, a], -1)
    })
    fgr.dispose()
    pha.dispose()
    const [height, width] = rgba.shape.slice(0, 2)
    const pixelData = new Uint8ClampedArray(await rgba.data())
    const imageData = new ImageData(pixelData, width, height)
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d')?.putImageData(imageData, 0, 0, 0, 0, width, height)
    rgba.dispose()
  }

  img2tenser = (imgData: HTMLImageElement) => {
    return tf.tidy(() => {
      return tf.browser.fromPixels(imgData).expandDims(0).div(255)
    })
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '20px'
        }}
      >
        <Upload
          accept="image/jpg, image/jpeg, image/png"
          multiple={false}
          beforeUpload={this.handleUpload}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <canvas
          ref={this.photoEl}
          style={{
            width: '400px',
            height: '300px',
            border: '1px solid gray',
            marginTop: '20px'
          }}
        />
        <canvas
          ref={this.modelEl}
          style={{
            width: '400px',
            height: '300px',
            border: '1px solid gray',
            margin: '20px 0'
          }}
        />
        <a href="https://removebg.junaid.guru/" target="blank" rel="noreferrer">
          body-pix
        </a>
      </div>
    )
  }
}

export default RemoveBgML
