function mainCtr($scope, $fourSquareData, $compile, $rootScope, NgMap, $stateParams, $state) {
    $stateParams.name = $stateParams.name == '' ? 'california' : $stateParams.name;
    $state.transitionTo('home', $stateParams);
  /*  $scope.yelpData = $yelpData.businesses;*/
    $scope.fourSquareData = $fourSquareData.response.venues;
    $scope.locationData = [];
   /* for (var i = 0; i < $scope.yelpData.length; i++) {
        $scope.locationData.push({
            'lat': $scope.yelpData[i].location.coordinate.latitude,
            'lon': $scope.yelpData[i].location.coordinate.longitude,
            'name': $scope.yelpData[i].name,
            'image_url': $scope.yelpData[i].image_url,
            'rating_img_url': $scope.yelpData[i].rating_img_url,
            'display_phone': $scope.yelpData[i].display_phone,
            'address': $scope.yelpData[i].location.address[0],
            'city': $scope.yelpData[i].location.city

        });
    }*/
    for (var i = 0; i < $scope.fourSquareData.length; i++) {
        $scope.locationData.push({
            'lat': $scope.fourSquareData[i].location.lat,
            'lon': $scope.fourSquareData[i].location.lng,
            'name': $scope.fourSquareData[i].name,
            'address': $scope.fourSquareData[i].location.address,
            'image_url': 'https://irs0.4sqi.net/img/general/100x100/2341723_vt1Kr-SfmRmdge-M7b4KNgX2_PHElyVbYL65pMnxEQw.jpg',
            'display_phone': $scope.fourSquareData[i].contact.formattedPhone ? $scope.fourSquareData[i].contact.formattedPhone : 'Not Available',
            'city': $scope.fourSquareData[i].location.city
        });
    }

    $scope.showCity = function (event, index) {
        $scope.infoData = locationData[index].address;
        $scope.map.showInfoWindow('myInfoWindow', this);
    };

    $scope.sub = function () {
        $stateParams.index++;
        $stateParams.name = $scope.input;
        $state.transitionTo('home', $stateParams);
    }

};
module.exports = mainCtr;