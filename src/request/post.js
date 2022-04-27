import Vue from "vue";
import { getUrlQuery } from "@/utils";

export const getPost = () => {
  const query = {
    s: "yyj",
    c: "search",
    api_call_function: "module_list",
    pagesize: 9999,
    appid: process.env.VUE_APP_ID,
    appsecret: process.env.VUE_APP_SECRET,
  };
  const url = process.env.VUE_APP_API + process.env.VUE_APP_API_PATH;
  return Vue.http
    .get(url, {
      params: query,
    })
    .then(
      (json) => {
        return json.body;
      },
      (err) => {
        console.log(err);
      }
    );
};

export const getPostDetail = (id = 50) => {
  const query = {
    s: "yyj",
    c: "show",
    api_call_function: "module_show",
    id,
    appid: process.env.VUE_APP_ID,
    appsecret: process.env.VUE_APP_SECRET,
  };
  const url = process.env.VUE_APP_API + process.env.VUE_APP_API_PATH;
  return Vue.http
    .get(url, {
      params: query,
    })
    .then(
      (json) => {
        return json.body;
      },
      (err) => {
        console.log(err);
      }
    );
};

export const EditImage = (s) => {
  const _query = getUrlQuery();
  const uid = _query.api_auth_uid || window.localStorage.getItem("YUE100_UID");
  const code =
    _query.api_auth_code || window.localStorage.getItem("YUE100_CODE");
  const query = {
    s: "member",
    c: "home",
    api_call_function: "module_show",
    api_auth_uid: uid,
    api_auth_code: code,
    appid: process.env.VUE_APP_ID,
    appsecret: process.env.VUE_APP_SECRET,
    m: "bgimage",
  };
  const body = {
    image: s,
  };

  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    emulateJSON: true,
    params: query,
  };
  const url = process.env.VUE_APP_API + process.env.VUE_APP_API_PATH;
  return Vue.http.post(url, body, options).then(
    (json) => {
      return json.body;
    },
    (err) => {
      console.log(err);
    }
  );
};

export const aboutPost = (id = 50) => {
  const query = {
    s: "yyj",
    c: "search",
    api_call_function: "search_by_relid",
    relid: id,
    pagesize: 999,
    appid: process.env.VUE_APP_ID,
    appsecret: process.env.VUE_APP_SECRET,
  };
  const url = process.env.VUE_APP_API + process.env.VUE_APP_API_PATH;
  return Vue.http
    .get(url, {
      params: query,
    })
    .then(
      (json) => {
        return json.body;
      },
      (err) => {
        console.log(err);
      }
    );
};
