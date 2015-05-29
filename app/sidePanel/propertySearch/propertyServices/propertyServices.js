angular.module('imapsNgApp')
.directive('propertyServices', function () {
	return {
		templateUrl: 'sidePanel/propertySearch/propertyServices/propertyServices.html',
		restrict: 'E',
		controller: function ($scope, property, $filter) {
			$scope.display = {categories:[]};

			var writeFields = function (line, atts) {
				line = line.replace(/:proper/g, "");
				var regExp = /\[(.*?)\]/g;
				for (m = regExp.exec(line); m; m = regExp.exec(line)) {
					line = line.replace(m[0], atts[m[1]]);
				};
				return line;
			};

			var getService = function (results, layerId) {
				return $filter('filter')(results, function (result) {
					return result.layerId === layerId;
				});
			};
			var handleResponse = function (response) {
				angular.forEach($scope.config.services.categories, function (category) {
					var c = {title: category.title, services:[]};
					angular.forEach(category.services, function (service) {
						var results = getService(response.results, service.layerId);
						if (results.length > 0) {
							var s = {title: writeFields(service.title, results[0].attributes), items:[]};
							angular.forEach(results, function (result) {
								var lines = service.labels.split(';');
								angular.forEach(lines, function (line) {
									s.items.push({labels: writeFields(line, result.attributes) + "<br/>"});
								});
							});
							if (s.items.length > 0) {
								c.services.push(s);
							}
						}

					})
					if (c.services.length > 0) {
						$scope.display.categories.push(c);
					}

				});
				console.log($scope.display);
			};

			$scope.$on('servicesClicked', function (e, geometry) {
				require([

				    "esri/graphic"
				], function(Graphic) {
					var jsonConv = new esriConverter();
					var gj = {type: 'Feature', geometry: jsonConv.toGeoJson($scope.geometry)};
					var newgj = turf.buffer(gj, 2000, 'feet');
					jsonConv = new geoJsonConverter();
					var newgeom = jsonConv.toEsri(newgj);
					newgeom.features[0].symbol = {"color":[0,0,0,64],"outline":{"color":[0,0,0,255],
    "width":1,"type":"esriSLS","style":"esriSLSSolid"},
    "type":"esriSFS","style":"esriSFSSolid"};
		console.log(JSON.stringify(gj));
		console.log(JSON.stringify(newgj));
					var g = new Graphic(newgeom.features[0]);
				//	$scope.map.graphics.add(g);
					handleResponse($scope.response);
				});
			});
		},
		link: function (scope, element, attrs) {
			scope.response = {
 "results": [
  {
   "layerId": 1,
   "layerName": "Precinct",
   "displayFieldName": "PRECINCT",
   "value": "05-07",
   "attributes": {
    "OBJECTID": "385",
    "PRECINCT": "05-07",
    "WAKE.PRECINCT.COUNTY": "WAKE",
    "Shape": "Polygon",
    "": "69094.669488",
    "REID": "0090551",
    "ST_NAME": "GOOD HOPE CHURCH RD",
    "CITY": "CARY, NC 27519",
    "POLL_PL": "Good Hope Baptist Church of Carpenter",
    "ST_NUMBER": "6636"
   }
  },
  {
   "layerId": 2,
   "layerName": "State Senate",
   "displayFieldName": "NAME",
   "value": "Josh Stein",
   "attributes": {
    "OBJECTID": "964",
    "DISTRICT": "16",
    "NAME": "Josh Stein",
    "PHONE": "919-715-6400",
    "PARTY": "Democrat",
    "WEBSITE": "http://www.ncga.state.nc.us/gascripts/members/viewMember.pl?sChamber=S&nUserID=267",
    "Shape": "Polygon"
   }
  },
  {
   "layerId": 3,
   "layerName": "US House of Representatives",
   "displayFieldName": "NAME",
   "value": "David Price",
   "attributes": {
    "OBJECTID": "643",
    "DISTRICT": "4",
    "NAME": "David Price",
    "PHONE": "(919)859-5999",
    "PARTY": "Democrat",
    "WEBSITE": "http://price.house.gov/",
    "Shape": "Polygon"
   }
  },
  {
   "layerId": 4,
   "layerName": "State House of Representatives",
   "displayFieldName": "NAME",
   "value": "Marilyn Avila",
   "attributes": {
    "OBJECTID": "329",
    "DISTRICT": "40",
    "NAME": "Marilyn Avila",
    "PHONE": "919-733-5530",
    "PARTY": "Republican",
    "WEBSITE": "http://www.ncleg.net/gascripts/members/membersByDistrict.pl?sChamber=H&nDistrict=40",
    "Shape": "Polygon"
   }
  },
  {
   "layerId": 5,
   "layerName": "County Commissioners",
   "displayFieldName": "NAME",
   "value": "John Burns",
   "attributes": {
    "OBJECTID": "1603",
    "DISTRICT": "7",
    "NAME": "John Burns",
    "Shape": "Polygon"
   }
  },
  {
   "layerId": 6,
   "layerName": "Board of Education",
   "displayFieldName": "NAME",
   "value": "Zora Felton",
   "attributes": {
    "OBJECTID": "5",
    "DISTRICT": "7",
    "NAME": "Zora Felton",
    "Shape": "Polygon"
   }
  },
  {
   "layerId": 8,
   "layerName": "Cary Town Council",
   "displayFieldName": "DIST",
   "value": "A",
   "attributes": {
    "OBJECTID": "1289",
    "DIST": "A",
    "REP": "Jennifer Robinson",
    "ATLG_REP1": "Ervin Portman",
    "ATLG_REP2": "Null",
    "MAYOR": "Harold Weinbrecht",
    "CURR_DATE": "Null",
    "Shape": "Polygon",
    "SHAPE.AREA": "414928667.11454",
    "SHAPE.LEN": "443723.177528"
   }
  },
  {
   "layerId": 13,
   "layerName": "Cary Zoning",
   "displayFieldName": "NAME",
   "value": "PDDMajor",
   "attributes": {
    "OBJECTID": "4451",
    "NAME": "PDDMajor",
    "Shape": "Polygon"
   }
  },
  {
   "layerId": 24,
   "layerName": "City Limit",
   "displayFieldName": "LONG_NAME",
   "value": "CARY",
   "attributes": {
    "OBJECTID": "262971",
    "SHAPE": "Polygon",
    "LONG_NAME": "CARY"
   }
  },
  {
   "layerId": 25,
   "layerName": "Planning Jurisdiction (ETJ)",
   "displayFieldName": "JURISDICTION",
   "value": "CARY",
   "attributes": {
    "OBJECTID": "2894",
    "ACRES": "41442.086967",
    "JURISDICTION": "CARY",
    "PLAN_JURIS": "CA",
    "Shape": "Polygon",
    "SHAPE.AREA": "1818900196.68369",
    "SHAPE.LEN": "652784.430337"
   }
  },
  {
   "layerId": 26,
   "layerName": "Township",
   "displayFieldName": "NAME",
   "value": "CEDAR FORK",
   "attributes": {
    "FTR_CODE": "1",
    "TOWNSHIP": "5",
    "NAME": "CEDAR FORK",
    "OBJECTID": "7",
    "SHAPE": "Polygon",
    "SHAPE.AREA": "1005677222.725",
    "SHAPE.LEN": "188416.172451"
   }
  },
  {
   "layerId": 29,
   "layerName": "Subdivision",
   "displayFieldName": "NAME",
   "value": "TWIN LAKES",
   "attributes": {
    "OBJECTID": "682324",
    "ACCESS_RD": "LAKE GROVE BLVD",
    "NAME": "TWIN LAKES",
    "APPROVDATE": "1/1/2005",
    "ACRES": "150.527769",
    "LOTS": "391",
    "DENSITY": "2.597527",
    "APPLDATE": "Null",
    "SNUMBER": "Null",
    "MAPCLASS": "5",
    "ISCLUSTER": "Null",
    "RLDO_SPENT": "Null",
    "JURISDICTION": "CARY",
    "STATUS": "Existing",
    "Shape": "Polygon",
    "SHAPE.AREA": "6562719.921628",
    "SHAPE.LEN": "11985.501167"
   }
  },
  {
   "layerId": 32,
   "layerName": "Collection Day",
   "displayFieldName": "TRASH_COLLECTION_DAY",
   "value": "Wednesday",
   "attributes": {
    "OBJECTID": "1315",
    "TRASH_COLLECTION_DAY": "Wednesday",
    "CITY": "Cary",
    "URL": "http://www.townofcary.org/Departments/Public_Works_and_Utilities.htm",
    "HOLIDAY_URL": "http://www.townofcary.org/Departments/Public_Works_and_Utilities/Garbage_and_Recycling/Garbage_Collection/Holiday_Schedule.htm",
    "Shape": "Polygon",
    "SHAPE.AREA": "8893612.286131",
    "SHAPE.LEN": "14636.707804"
   }
  },
  {
   "layerId": 40,
   "layerName": "County Fire Response Districts",
   "displayFieldName": "District",
   "value": "Cary Fire",
   "attributes": {
    "OBJECTID": "970",
    "District": "Cary Fire",
    "Shape": "Polygon"
   }
  },
  {
   "layerId": 42,
   "layerName": "EMS Franchise Districts",
   "displayFieldName": "District",
   "value": "CARY",
   "attributes": {
    "OBJECTID_1": "5",
    "District": "CARY",
    "Shape": "Polygon"
   }
  },
  {
   "layerId": 43,
   "layerName": "EMS Response Districts",
   "displayFieldName": "District",
   "value": "MORRISVILLE",
   "attributes": {
    "OBJECTID": "391",
    "Sq Miles": "23.315299",
    "District": "MORRISVILLE",
    "Shape": "Polygon"
   }
  },
  {
   "layerId": 46,
   "layerName": "Soils",
   "displayFieldName": "NAME",
   "value": "WsB2",
   "attributes": {
    "OBJECTID": "6180",
    "NAME": "WsB2",
    "HYDRIC": "Null",
    "SHAPE": "Polygon",
    "DESCRIPTION": "White Store sandy loam, 2 to 6 percent slopes, eroded"
   }
  },
  {
   "layerId": 46,
   "layerName": "Soils",
   "displayFieldName": "NAME",
   "value": "WsC2",
   "attributes": {
    "OBJECTID": "7057",
    "NAME": "WsC2",
    "HYDRIC": "Null",
    "SHAPE": "Polygon",
    "DESCRIPTION": "White Store sandy loam, 6 to 10 percent slopes, eroded"
   }
  },
  {
   "layerId": 47,
   "layerName": "Hydrologic Unit",
   "displayFieldName": "HUC_CODE",
   "value": "03020201080010",
   "attributes": {
    "HUC_CODE": "03020201080010",
    "OBJECTID": "23",
    "SHAPE": "Polygon"
   }
  },
  {
   "layerId": 49,
   "layerName": "Major Watersheds",
   "displayFieldName": "BASIN",
   "value": "Neuse",
   "attributes": {
    "OBJECTID": "3",
    "BASIN": "Neuse",
    "SHAPE": "Polygon"
   }
  }
 ]
}
		}
	}
});
