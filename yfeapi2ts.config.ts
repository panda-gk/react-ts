
const config = {
  target: "ts",
  serverUrl: "http://yapi.ywwl.org",
  outputFilePath: "src/api",
  projectId: "276",
  _yapi_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyNiwiaWF0IjoxNTgyMTAxNDA2LCJleHAiOjE1ODI3MDYyMDZ9.oowpuTYf_SOKhPDadi_3Ln8xVa7j1W7IQvVT-iOHAl8",
  _yapi_uid: "126",
  generateApiName: (pdth, id) => `id${id}`,
  generateApiFileCode: api => {
    const arr = [
      `
      /**
      * ${api.title}
      * ${api.markdown || ""}
      **/
      `,
      "import request from '../utils/request'",
      "type Serve<T, G> = (data?: T) => Promise<G>",
      api.requestInterface,
      api.responseInterface,
      `const http: Serve<${api.reqInterfaceName}, ${
        api.resInterfaceName
      }['data'] > = (data?) =>  request({
        method: '${api.method}',
        url: '${api.path}',
        ${(() => {
          if (api.method.toLocaleLowerCase() === "get") {
            return "params: data";
          } else {
            return "data: data";
          }
        })()}
      }) `,
      `export default http`
    ];
    return arr.join(`
    `);
  }
};

export default config
