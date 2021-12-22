import axios, { AxiosInstance } from 'axios'
import React, { useState } from 'react'
import { Input, Button } from 'antd'

function PS(): JSX.Element {
  const [api, setApi] = useState('')

  const [xApi, setXApi] = useState('14c5630d22f0427e9a82ba16c7570093')
  const [auth, setAuth] = useState(
    'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LTEuY2VyIn0.eyJpZCI6IjE2NDAxNDM5NzU0MDFfYzIxMGY0NjctMDI1Ni00MDI3LWJmMzgtNmU5NmZjNDFiMDdmX3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiIxNGM1NjMwZDIyZjA0MjdlOWE4MmJhMTZjNzU3MDA5MyIsInVzZXJfaWQiOiIwQkQzMzI3MjYxQjNFOUY3MEE0OTVGQkFAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiIwQkQzMzI3MjYxQjNFOUY3MEE0OTVGQkFAdGVjaGFjY3QuYWRvYmUuY29tIiwiZmciOiJXQk5SSVpDT0ZMRTVJN1VDSE1SRlJIUUEyST09PT09PSIsIm1vaSI6ImIzOWZiYjQzIiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwiY3JlYXRlZF9hdCI6IjE2NDAxNDM5NzU0MDEiLCJzY29wZSI6Im9wZW5pZCxBZG9iZUlELHJlYWRfb3JnYW5pemF0aW9ucyJ9.KGb9IVje1tZlit_haEbwsuJnQPPFDsh1vnCFE4-eSbsZnWiHRhvY3bHPJrnnjjb6q4Zv1e30KWBO4j9nPv8sMmKz9-rf2T7d6XV0zSQQw3EnlAM4O56xxqlowkKWi3l0ub9NpdyZfAYISkSUFqrxCv0Yrq5tUqFwgpkjGOJbCOMEPGhW0Qf6totCJ0a7uqeR642yTfw8EzjCP08_PS_EihCA25Eanu5W2YX3sc2t5fzG7EUV37YO-t8ZG-6rZ8ca8JP4nvc5Zq0ZOCChMSb4SVN9MJao0GHPDQFS0Rv50EOcIqmwrRmzg2yxH7PCtsjOKDD5De6YKju8ODfEb8mozQ'
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

  const handleRemoveBg = () => {
    setApi('')

    instance
      .post('https://image.adobe.io/sensei/cutout', {
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
      .then(res => {
        setApi(res.data._links.self.href)
      })
  }

  const handleGetLayerInfo = () => {
    setApi('')
    instance
      .post('https://image.adobe.io/pie/psdService/documentManifest', {
        inputs: [
          {
            href: 'https://odaneo.blob.core.windows.net/psd/1.psd',
            storage: 'azure'
          }
        ]
      })
      .then(res => {
        setApi(res.data._links.self.href)
      })
  }

  const handleCreate = () => {
    setApi('')
    instance
      .post('https://image.adobe.io/pie/psdService/smartObject', {
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
      .then(res => {
        setApi(res.data._links.self.href)
      })
  }

  const handleAutotone = () => {
    setApi('')
    instance
      .post('https://image.adobe.io/lrService/autoTone', {
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
      .then(res => {
        setApi(res.data._links.self.href)
      })
  }

  const handleCheckStatus = () => {
    instance.get(api).then(res => {
      console.log(res)
    })
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
    </div>
  )
}

export default PS
