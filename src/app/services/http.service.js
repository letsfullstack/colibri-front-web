export const HttpWebService = {
    name: "HttpService",
    function: ["$http", "$rootScope", HttpService]
}

function HttpService($http, $rootScope) {
    this.get = (route, params, header) => {
        let options = {params, ...header};
        return $http.get($rootScope.getCurrentEnvironment().SERVER_URL+route, options);
    }
    this.post = (route, data, options) => {
        return $http.post($rootScope.getCurrentEnvironment().SERVER_URL+route, data, options);
    }
    this.put = (route, data, options) => {
        return $http.put($rootScope.getCurrentEnvironment().SERVER_URL+route, data, options);
    }
    this.delete = (route, data, header) => {
        let options = {data, ...header};
        return $http.delete($rootScope.getCurrentEnvironment().SERVER_URL+route, options);
    }
}