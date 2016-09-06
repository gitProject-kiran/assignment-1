/**
 * Created by M036 on 9/1/2016.
 */
 var verifyCityA = false;
function loadData($http, $q) {
    'ngInject';
    var oauthSignature = require('oauth-signature');
    return {
        "retrieveYelp": function (input, callback) {
            var defered = $q.defer();
            var method = 'GET';
            var url = 'http://api.yelp.com/v2/search';
            var location = input;
            var consumerSecret = 'UgKdpO46BHlEOT-3K3MIPilF-Ro'; //Consumer Secret

            var params = {
                callback: callback,
                location: location,
                oauth_consumer_key: 'hyIQVkkGLREDsZobyPp5dQ', //Consumer Key
                oauth_token: 'PCPmAjNSEpcZ4T7TFaQ3VKj8-nhhRhWJ', //Token
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                term: 'food'
            };

            var tokenSecret = 'uF-cSlKj9usvzCIjSeVzwR2OcS8'; //Token Secret
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {encodeSignature: false});
            params['oauth_signature'] = signature;
                $http.jsonp(url, {params: params})
                    .success(function (data) {
                        console.log('verify 1');
                        defered.resolve(data);
                    })
                    .error(function (data) {
                        defered.resolve([]);
                        console.log("Error Promise getQuote user.js");
                    });
                return defered.promise;
        },
        "retrieveFourSquare": function (input) {
            var defered = $q.defer();
            var location = input;
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyB7ptHzW6ivZb_SAzXsF3PTOB0udygejzo').success(function (dataFourSquare) {
                var lat = dataFourSquare.results[0].geometry.location.lat;
                var lng = dataFourSquare.results[0].geometry.location.lng;
                $http.get('https://api.foursquare.com/v2/venues/search?ll=' + lat + ',' + lng + '&oauth_token=UYJI4JL3SA3GCJXYKPOJFK3NWEAIOPRBK1AMS4XBQTFP2U3F&v=20160831')
                    .success(function (data) {
                        console.log('data',data);
                        defered.resolve(data);
                    })
                    .error(function (data) {
                        console.error('retrieveFourSquare > data', error);
                         defered.resolve(data);
                    });

            });
            return defered.promise;
        }
    }
};
module.exports = /*@ngInject*/ loadData;