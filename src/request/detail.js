import Vue from "vue";

const getDetail = (id = 50) => {
    const url = `api/index.php?s=ydd&c=show&id=${id}&api_call_function=module_show&appid=1&appsecret=PHPCMF9CEAD1B8FFE8B`
    return Vue.http.get(url).then(json => {
        return json.body;
    }, err => {
        console.log(err)
    })
}

export default getDetail;