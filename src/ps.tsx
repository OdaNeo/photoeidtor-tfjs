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

  const [src, setSrc] = useState("");
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

  const handleCheckStatus = () => {
    instance.get(api).then((res) => {
      alert(res.data.status);
      setSrc(`https://odaneo.blob.core.windows.net/psd/2.png`);
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
      <div>
        <div
          style={{
            margin: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={handleRemoveBg}
            style={{
              width: "120px",
            }}
          >
            Remove Bg
          </button>
        </div>
        <div
          style={{
            margin: "20px",
            display: "flex",
            flexDirection: "column",
            width: "200px",
          }}
        >
          <img alt="" src={`https://odaneo.blob.core.windows.net/psd/1.png`} />
          {api && (
            <button
              onClick={handleCheckStatus}
              style={{
                margin: "20px 0",
                width: "120px",
              }}
            >
              Check status
            </button>
          )}
          {src && <img alt="" src={src} />}
        </div>
      </div>
    </div>
  );
}

export default PS;
