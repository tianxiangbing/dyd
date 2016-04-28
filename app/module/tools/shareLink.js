/**
 * 分享链接简单路由
 * url:host/share/:base64(::stage)/:props/:state
 * @param stage
 * @param props
 * @param state
 */

export const host = "http://m.dianyadian.com"
export const path = "/share/#/";

//创建连接
export const create = (stage,props,state)=>{
    if(typeof stage !== 'string' && stage.name){
        stage = stage.name
    }
    let link = {stage,props,state}
    return Base64.encode(JSON.stringify(link))
};

//解析连接
export const analyze = (hash)=>{
    try{
        return JSON.parse(Base64.decode(hash))
    }catch (e){
        return void 0
    }
};
export const createQR = (url)=>{

};