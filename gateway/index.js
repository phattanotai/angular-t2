const fastify = require("fastify");
const FormData = require("form-data");
const axios = require("axios");

const app = fastify({
  logger: true,
});

app.register(require("fastify-multipart"), {
  attachFieldsToBody: true,
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 100, // Max field value size in bytes
    fields: 10, // Max number of non-file fields
    fileSize: 1000000, // For multipart forms, the max file size in bytes
    files: 1, // Max number of file fields
    headerPairs: 2000, // Max number of header key=>value pairs
  },
});
app.register(require("fastify-cors"), {
  origin: "*",
  methods: ["POST", "GET"],
});

const url = "http://dev-sw6-uapi.ecm.in.th";
const post = (params, data) => {
  return new Promise(async function (resolve) {
    let formData = new FormData();
    for (let index in data) {
      formData.append(data[index].fieldname, data[index].value);
    }
    axios({
      method: "post",
      url: `${url}/${params}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log("errror", error);
        resolve(error);
      });
  });
};

const get = (params) => {
  return new Promise(async function (resolve) {
    axios({
      method: "get",
      url: `${url}/${params}`,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log("errror", error);
        resolve(error);
      });
  });
};

app.get("/wellcome", async () => {
  return "wellcome";
});

app.get("/*", async (req) => {
  const res = await get(req.url);
  return res;
});

app.post("/*", async (req) => {
  const res = await post(req.url, req.body);
  return res;
});

app.listen(3000, "0.0.0.0");
