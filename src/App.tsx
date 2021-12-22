import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ImageEditor from './image-editor'
import RemoveBgML from './remove-bg'
import PS from './ps'
import { Tabs } from 'antd'

const { TabPane } = Tabs

export function App() {
  const onChange = (activeKey: string) => {
    window.location.href = `${activeKey}`
  }
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%'
      }}
    >
      <Tabs
        onChange={onChange}
        activeKey={window.location.pathname}
        type="card"
        style={{
          height: '100%'
        }}
        tabPosition={'left'}
        size={'small'}
      >
        <TabPane tab="Image Editor" key="/" />
        <TabPane tab="Remove Bg ML" key="/ml" />
        <TabPane tab="PhotoShop API" key="/ps" />
      </Tabs>
      <BrowserRouter
        basename={(window as any).__POWERED_BY_QIANKUN__ ? '/photoeditor' : '/'}
      >
        <Routes>
          <Route path="/" element={<ImageEditor />} />
          <Route path="/ml" element={<RemoveBgML />} />
          <Route path="/ps" element={<PS />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
