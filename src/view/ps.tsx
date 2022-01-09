import axios, { AxiosInstance } from 'axios'
import React, { useState } from 'react'
import { Input, Button } from 'antd'
import formatUtil from '../utils/format'

function PS(): JSX.Element {
  const [api, setApi] = useState('')
  const [html, setHtml] = useState('')

  const [xApi, setXApi] = useState('14c5630d22f0427e9a82ba16c7570093')
  const [auth, setAuth] = useState(
    'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LTEuY2VyIn0.eyJpZCI6IjE2NDAyNjEzODg3MTdfNzhkM2M2NTMtNDNkOC00NzYzLTljMjctZGU2NjkzZmI0MDg0X3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiIxNGM1NjMwZDIyZjA0MjdlOWE4MmJhMTZjNzU3MDA5MyIsInVzZXJfaWQiOiIwQkQzMzI3MjYxQjNFOUY3MEE0OTVGQkFAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiIwQkQzMzI3MjYxQjNFOUY3MEE0OTVGQkFAdGVjaGFjY3QuYWRvYmUuY29tIiwiZmciOiJXQlJMVFVaSEZMRTVJN1VDSE1SRlJIUUEyST09PT09PSIsIm1vaSI6IjEyMDgzNWYxIiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwic2NvcGUiOiJvcGVuaWQsQWRvYmVJRCxyZWFkX29yZ2FuaXphdGlvbnMiLCJjcmVhdGVkX2F0IjoiMTY0MDI2MTM4ODcxNyJ9.OyevwJ6gLvh0sPpmlFfsJ5tzDh0xBnDXGOpDG-7fmsC53gofylekLZHJzEheXO42FbhsBc1Ut-xsdsUUESYKc8YfLa3XEdOerbeAhZsqPQflqkY941cBJabhy8beI7AOJ4FvuWdjhywZIeqkvjAryEu5Rpe1hjxBawImV63tXBdp1Rez4fQAOspK6Ju8ecgrJR1EhEkgECI9hbcWg5d6ORmO0LGWsZvJXgjNkNvCFcdj_tYlu7jfg6Iq0stI9K2iX8IC_9erbnoIr83zgl5vug68JQkCiI7clpSE6qk2bOqMUE3Al7tTHWn_KigZpmm_klsHZzj02zoGHwXy7vqlAg'
  )
  const [azureSAS, setAzureSAS] = useState(
    '?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-01-08T09:08:53Z&st=2021-12-21T01:08:53Z&spr=https,http&sig=ewv%2FRf02HNUMBNcOVAKmArWyAsjEzPN3h3L69Kyycbw%3D'
  )

  const instance: AxiosInstance = axios.create({
    headers: {
      'x-api-key': `${xApi}`,
      Authorization: `Bearer ${auth}`,
      'Content-Type': 'application/json'
    }
  })

  instance.interceptors.response.use(
    res => {
      setHtml(formatUtil.objToHTML(res.data))
      setApi(res.data._links.self.href)
      return res
    },
    err => {
      setHtml(formatUtil.objToHTML(err.toJSON()))
    }
  )

  const handleRemoveBg = () => {
    setApi('')
    setHtml('')
    instance.post('https://image.adobe.io/sensei/cutout', {
      input: {
        storage: 'azure',
        href: 'https://odaneo.blob.core.windows.net/psd/1.png'
      },
      options: {
        optimize: 'performance',
        process: {
          postprocess: true
        },
        service: {
          version: '2.5'
        }
      },
      output: {
        href: `https://odaneo.blob.core.windows.net/psd/2.png${azureSAS}`,
        storage: 'azure',
        type: 'image/png',
        overwrite: true
      }
    })
  }

  const handleGetLayerInfo = () => {
    setApi('')
    setHtml('')
    instance.post('https://image.adobe.io/pie/psdService/documentManifest', {
      inputs: [
        {
          href: 'https://odaneo.blob.core.windows.net/psd/1.psd',
          storage: 'azure'
        }
      ]
    })
  }

  const handleCreate = () => {
    setApi('')
    setHtml('')
    instance.post('https://image.adobe.io/pie/psdService/smartObject', {
      inputs: [
        {
          href: 'https://odaneo.blob.core.windows.net/psd/1.psd',
          storage: 'azure'
        }
      ],
      options: {
        layers: [
          {
            name: 'New',
            add: {
              insertTop: true
            },
            input: {
              href: 'https://odaneo.blob.core.windows.net/psd/1.png',
              storage: 'azure'
            }
          }
        ]
      },
      outputs: [
        {
          storage: 'azure',
          href: `https://odaneo.blob.core.windows.net/psd/2.psd${azureSAS}`,
          type: 'vnd.adobe.photoshop',
          overwrite: true
        }
      ]
    })
  }

  const handleAutotone = () => {
    setApi('')
    setHtml('')
    instance.post('https://image.adobe.io/lrService/autoTone', {
      inputs: {
        href: 'https://odaneo.blob.core.windows.net/psd/1.png',
        storage: 'azure'
      },
      outputs: [
        {
          href: `https://odaneo.blob.core.windows.net/psd/3.png${azureSAS}`,
          type: 'image/png',
          storage: 'azure',
          overwrite: true
        }
      ]
    })
  }

  const handleCheckStatus = () => {
    setHtml('')
    instance.get(api)
  }

  const handleChangeSAS = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAzureSAS(e.currentTarget.value)
  }

  const handleChangeXApi = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXApi(e.currentTarget.value)
  }

  const handleChangeAuth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(e.currentTarget.value)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}
    >
      <Input
        style={{
          width: '900px',
          marginTop: '10px',
          marginBottom: '10px'
        }}
        allowClear
        addonBefore="azureSAS"
        value={azureSAS}
        onChange={handleChangeSAS}
      />
      <Input
        style={{
          width: '900px',
          marginBottom: '10px'
        }}
        allowClear
        addonBefore="x-api-key"
        value={xApi}
        onChange={handleChangeXApi}
      />
      <Input
        style={{
          width: '900px',
          marginBottom: '10px'
        }}
        allowClear
        addonBefore="Authorization"
        value={auth}
        onChange={handleChangeAuth}
      />
      <Button
        type="primary"
        style={{
          marginBottom: '10px'
        }}
        onClick={handleRemoveBg}
      >
        Remove Bg
      </Button>
      <Button
        type="primary"
        style={{
          marginBottom: '10px'
        }}
        onClick={handleGetLayerInfo}
      >
        Get Layer Info
      </Button>
      <Button
        type="primary"
        style={{
          marginBottom: '10px'
        }}
        onClick={handleCreate}
      >
        Creating a SmartObject
      </Button>
      <Button
        type="primary"
        style={{
          marginBottom: '10px'
        }}
        onClick={handleAutotone}
      >
        Autotone an image
      </Button>
      {api && <Button onClick={handleCheckStatus}>Check status</Button>}
      {html && (
        <div
          style={{
            maxWidth: '1200px',
            wordBreak: 'break-all'
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      )}
    </div>
  )
}

export default PS
