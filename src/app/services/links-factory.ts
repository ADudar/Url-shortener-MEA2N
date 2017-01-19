export const LinkFactory = {
 
  getAll :function(){
  	return $http.get('http://localhost:3000/api/links');
  }
}    


 const $http = {
	get: function(url: string) {
		return _sendRequest(url, null, 'GET');
    },
    post: function(url: string, payload: any){
    	return _sendRequest(url, payload, 'POST');
    },
    put: function(url: string, payload: any){
    	return _sendRequest(url, payload, 'PUT');
    },
    delete: function(url: string, payload: any){
    	return _sendRequest(url, null, 'DELETE');
    }
}

function _sendRequest(url: string, payLoad: any, type: string): Promise<any> {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(type, url);
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            req.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/api");

            req.onload = function() {
                if (req.status == 200) {
                    resolve(JSON.parse(req.response));
                } else {
                    reject(JSON.parse(req.response));
                }
            };

            req.onerror = function() {
                reject(JSON.parse(req.response));
            };

            if (payLoad) {
                req.send(JSON.stringify(payLoad));
            } else {
                req.send(null);
            }
        });
    }