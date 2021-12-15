import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  headers: {
    "x-api-key": "14c5630d22f0427e9a82ba16c7570093",
    Authorization: "Bearer 1209332128dcde9af3c3547ccd9f60950de5caf6",
    "Content-Type": "application/json",
  },
});

function PS() {
  const handleGetPSDLayer = () => {
    instance
      .post("/psdService/documentManifest", {
        inputs: [
          {
            storage: "azure",
            href: "https://odaneo.blob.core.windows.net/psd/2.psd",
          },
        ],
        options: {
          thumbnails: {
            type: "image/jpeg",
          },
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <button onClick={handleGetPSDLayer}>Get PSD layer</button>
    </div>
  );
}

export default PS;
