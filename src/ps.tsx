import axios, { AxiosInstance } from "axios";
import React, { useState } from "react";

const instance: AxiosInstance = axios.create({
  headers: {
    "x-api-key": "14c5630d22f0427e9a82ba16c7570093",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LTEuY2VyIn0.eyJpZCI6IjE2NDAwMDg0MTE0NDdfMjg5MTcxOTMtZWJmNi00NTUwLTgyYTktYTEyOGMzZjI1ZmZlX3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiIxNGM1NjMwZDIyZjA0MjdlOWE4MmJhMTZjNzU3MDA5MyIsInVzZXJfaWQiOiIwQkQzMzI3MjYxQjNFOUY3MEE0OTVGQkFAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiIwQkQzMzI3MjYxQjNFOUY3MEE0OTVGQkFAdGVjaGFjY3QuYWRvYmUuY29tIiwiZmciOiJXQkpFRFVaSEZMRTVJN1VDSE1SRlJIUUEyST09PT09PSIsIm1vaSI6IjJlNGI5ODUzIiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwic2NvcGUiOiJvcGVuaWQsQWRvYmVJRCxyZWFkX29yZ2FuaXphdGlvbnMiLCJjcmVhdGVkX2F0IjoiMTY0MDAwODQxMTQ0NyJ9.DjFb8JH-Qf_-ePYthZr-DKT24ewi7pOMRWSeZqXjEtF129bPnJxZpuXLnQf2oC3UWZLNj2ky8VoMssynu0MN-oAPomKlrzewUi12PeLyH3pbRAbMPL5QBleniNaxTYJadWPFnb1AvQcCOhMjdm2nmitJEx-ry7jspmDi0ojexfB82ogiThUcTe2n_lTNUZeoKOr5pO0_6ysbBCi55aq_hApSGQjT3Yt1ITXpBY7JaMHp1IuyJcLuuxFujChVj_S_2pepDKk5Lizo-L-GUU4D7BpLjmQfDq0OHPQVCg-Yu8csg7tjOKMq5zAcVyydkMIHhBemlQZdc7RLYb5ssEOJhQ",
    "Content-Type": "application/json",
  },
});

function PS(): JSX.Element {
  const [api, setApi] = useState("");
  const [azureSAS, setAzureSAS] = useState(
    "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-01-08T09:08:53Z&st=2021-12-21T01:08:53Z&spr=https,http&sig=ewv%2FRf02HNUMBNcOVAKmArWyAsjEzPN3h3L69Kyycbw%3D"
  );

  const handleRemoveBg = () => {
    setApi("");

    instance
      .post("https://image.adobe.io/sensei/cutout", {
        input: {
          storage: "azure",
          href: "https://odaneo.blob.core.windows.net/psd/1.png",
        },
        options: {
          optimize: "performance",
          process: {
            postprocess: true,
          },
          service: {
            version: "2.5",
          },
        },
        output: {
          href: `https://odaneo.blob.core.windows.net/psd/2.png${azureSAS}`,
          storage: "azure",
          type: "image/png",
          overwrite: true,
        },
      })
      .then((res) => {
        setApi(res.data._links.self.href);
      });
  };

  const handleGetLayerInfo = () => {
    setApi("");
    instance
      .post("https://image.adobe.io/pie/psdService/documentManifest", {
        inputs: [
          {
            href: "https://odaneo.blob.core.windows.net/psd/1.psd",
            storage: "azure",
          },
        ],
      })
      .then((res) => {
        setApi(res.data._links.self.href);
      });
  };

  const handleCreate = () => {
    setApi("");
    instance
      .post("https://image.adobe.io/pie/psdService/smartObject", {
        inputs: [
          {
            href: "https://odaneo.blob.core.windows.net/psd/1.psd",
            storage: "azure",
          },
        ],
        options: {
          layers: [
            {
              name: "New",
              add: {
                insertTop: true,
              },
              input: {
                href: "https://odaneo.blob.core.windows.net/psd/1.png",
                storage: "azure",
              },
            },
          ],
        },
        outputs: [
          {
            storage: "azure",
            href: `https://odaneo.blob.core.windows.net/psd/2.psd${azureSAS}`,
            type: "vnd.adobe.photoshop",
            overwrite: true,
          },
        ],
      })
      .then((res) => {
        setApi(res.data._links.self.href);
      });
  };

  const handleAutotone = () => {
    setApi("");
    instance
      .post("https://image.adobe.io/lrService/autoTone", {
        inputs: {
          href: "https://odaneo.blob.core.windows.net/psd/1.png",
          storage: "azure",
        },
        outputs: [
          {
            href: `https://odaneo.blob.core.windows.net/psd/3.png${azureSAS}`,
            type: "image/png",
            storage: "azure",
            overwrite: true,
          },
        ],
      })
      .then((res) => {
        setApi(res.data._links.self.href);
      });
  };

  const handleCheckStatus = () => {
    instance.get(api).then((res) => {
      console.log(res);
    });
  };

  const handleChangeSAS = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAzureSAS(e.currentTarget.value);
  };
  return (
    <div>
      <input
        type="text"
        value={azureSAS}
        onChange={handleChangeSAS}
        style={{
          width: "80%",
          display: "block",
          margin: "0 auto",
          height: "40px",
          lineHeight: "40px",
        }}
      />
      {/* remove bg */}
      <button
        onClick={handleRemoveBg}
        style={{
          display: "block",
          margin: "20px",
        }}
      >
        Remove Bg
      </button>
      {/* get layer info */}
      <button
        style={{
          display: "block",
          margin: "20px",
        }}
        onClick={handleGetLayerInfo}
      >
        Get Layer Info
      </button>
      <button
        style={{
          display: "block",
          margin: "20px",
        }}
        onClick={handleCreate}
      >
        Creating a SmartObject
      </button>
      <button
        style={{
          display: "block",
          margin: "20px",
        }}
        onClick={handleAutotone}
      >
        Autotone an image
      </button>
      {api && (
        <button onClick={handleCheckStatus} style={{ marginLeft: "20px" }}>
          Check status
        </button>
      )}
    </div>
  );
}

export default PS;
