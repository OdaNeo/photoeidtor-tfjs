import React from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import TuiImageEditor from "tui-image-editor";
import * as tf from "@tensorflow/tfjs";

const MODEL_URL = "model.json";

export class ImageEditor extends React.Component<tuiImageEditor.IOptions> {
  rootEl = React.createRef<HTMLDivElement>();
  photoEl = React.createRef<HTMLCanvasElement>();
  modelEl = React.createRef<HTMLCanvasElement>();
  model!: tf.GraphModel;
  imageEditorInst!: TuiImageEditor;

  constructor(props: tuiImageEditor.IOptions) {
    super(props);
  }

  async componentDidMount() {
    this.imageEditorInst = new TuiImageEditor(this.rootEl.current as Element, {
      ...this.props,
    });
    this.model = await tf.loadGraphModel(MODEL_URL);
  }

  handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        this.drawToCanvas(reader.result as string);
      };
    }
  };

  drawToCanvas(imgData: string) {
    const cvs = this.photoEl.current;
    if (cvs) {
      cvs.width = 400;
      cvs.height = 300;
      const ctx = cvs.getContext("2d");
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
        this.main(img);
      };
    }
  }

  async main(imgData: HTMLImageElement) {
    const canvas = this.modelEl.current;
    if (canvas) {
      // Set initial recurrent state
      let [r1i, r2i, r3i, r4i] = [
        tf.tensor(0),
        tf.tensor(0),
        tf.tensor(0),
        tf.tensor(0),
      ];

      // Set down_sample ratio
      const downsample_ratio = tf.tensor(0.5);

      const src = this.img2tenser(imgData);

      const cb = await this.model.executeAsync(
        { src, r1i, r2i, r3i, r4i, downsample_ratio }, // provide inputs
        ["fgr", "pha", "r1o", "r2o", "r3o", "r4o"] // select outputs
      );
      if (Array.isArray(cb)) {
        const [fgr, pha, r1o, r2o, r3o, r4o] = cb;
        this.drawMatte(fgr.clone(), pha.clone(), canvas);
        canvas.style.backgroundColor = "rgb(120, 255, 155)";
      }
    }
  }

  async drawMatte(
    fgr: tf.Tensor<tf.Rank>,
    pha: tf.Tensor<tf.Rank>,
    canvas: HTMLCanvasElement
  ) {
    const rgba = tf.tidy(() => {
      const rgb = fgr.squeeze([0]).mul(255).cast("int32");
      const a = pha.squeeze([0]).mul(255).cast("int32");
      return tf.concat([rgb, a], -1);
    });
    fgr.dispose();
    pha.dispose();
    const [height, width] = rgba.shape.slice(0, 2);
    const pixelData = new Uint8ClampedArray(await rgba.data());
    const imageData = new ImageData(pixelData, width, height);
    console.log(imageData);
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.putImageData(imageData, 0, 0);

    rgba.dispose();
  }

  img2tenser = (imgData: HTMLImageElement) => {
    return tf.tidy(() => {
      return tf.browser.fromPixels(imgData).expandDims(0).div(255);
    });
  };

  componentWillUnmount() {
    this.imageEditorInst.destroy();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div ref={this.rootEl} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={this.handleUpload}
            multiple={false}
          />
          <canvas
            ref={this.photoEl}
            style={{
              width: "400px",
              height: "300px",
              border: "1px solid gray",
            }}
          />
          <canvas
            ref={this.modelEl}
            style={{
              border: "1px solid gray",
            }}
          />
        </div>
      </div>
    );
  }
}
