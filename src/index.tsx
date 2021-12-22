import './public-path'
import ReactDOM from 'react-dom'
import { App } from './App'

function render(props: { container?: Document }) {
  const { container } = props
  ReactDOM.render(
    <App />,
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  )
}
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap() {}

export async function mount(props: any) {
  render(props)
}

export async function unmount(props: any) {
  const { container } = props
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  )
}
