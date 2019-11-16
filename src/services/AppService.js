import API from "./ApiService";
export default class AppService{

  

    post(uri, body){
        body = body? body : {};
        return API.post(
            uri,
            JSON.stringify(body)
        );
    }
}