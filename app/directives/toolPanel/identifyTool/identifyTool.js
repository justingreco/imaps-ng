angular.module('imapsNgApp')
.directive('identifyTool', function () {
	return {
		templateUrl: 'directives/toolPanel/identifyTool/identifyTool.html',
		restrict: 'E',
		controller: function ($scope, $timeout) {
			var clickEvent = null;
			var map = null;
			var clickPt = null;
			$scope.$on('mapLoaded', function () {
				$scope.$watch('tool', function (tool) {
					if ($scope.map) {
						map = $scope.map
						require(["esri/tasks/query", "esri/tasks/QueryTask", "esri/geometry/Extent", "esri/dijit/PopupTemplate","dojo/on"], function (Query, QueryTask, Extent, PopupTemplate, on) {
							if (tool.title === 'Identify') {
								on($scope.map, 'click', function (e) {
									  clickPt = e.mapPoint;
										var ext = new Extent(clickPt.x - 50, clickPt.y - 50, clickPt.x + 50, clickPt.y + 50, $scope.map.spatialReference);
										var q = new Query();
										q.geometry = ext;
										q.outFields = ['*'];
										q.returnGeometry = true;
										q.outSpatialReference = $scope.map.spatialReference;
										var qt = new QueryTask('https://maps.raleighnc.gov/arcgis/rest/services/BaseMapBasic/MapServer/4');
										qt.execute(q, function (featureSet) {
													$scope.$apply();

													for (var i = 0; i < featureSet.features.length;i++) {
														featureSet.features[i].infoTemplate = new PopupTemplate({title:"Streets",fieldInfos:[
														{fieldName:"OBJECTID",label:"OBJECTID",tooltip:"",visible:false,stringFieldOption:"textbox"},
														{fieldName:"STREET_ID",label:"STREET_ID",tooltip:"",visible:false,format:{places:0,digitSeparator:true},stringFieldOption:"textbox"},
														{fieldName:"CARTONAME",label:"Street Name",tooltip:"",visible:true,stringFieldOption:"textbox"},
														{fieldName:"FRLEFT_A",label:"From Left",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
														{fieldName:"TOLEFT_A",label:"To Left",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
														{fieldName:"FRRIGHT_A",label:"From Right",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
														{fieldName:"TORIGHT_A",label:"To Right",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
														{fieldName:"L_ZIPNAME",label:"Left City",tooltip:"",visible:true,stringFieldOption:"textbox"},
														{fieldName:"R_ZIPNAME",label:"Right City",tooltip:"",visible:true,stringFieldOption:"textbox"},
														{fieldName:"ZIP_L",label:"Left ZIP",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
														{fieldName:"ZIP_R",label:"Right ZIP",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
														{fieldName:"CLASSNAME",label:"Class",tooltip:"",visible:false,stringFieldOption:"textbox"},
														{fieldName:"STATEROAD",label:"State Road #",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
														{fieldName:"CORP",label:"Corporate Limits",tooltip:"",visible:true,stringFieldOption:"textbox"},
														{fieldName:"INPUT_",label:"INPUT_",tooltip:"",visible:false,stringFieldOption:"textbox"},
														{fieldName:"CREATE_DATE",label:"CREATE_DATE",tooltip:"",visible:false,format:{dateFormat:"longMonthDayYear"},stringFieldOption:"textbox"},
														{fieldName:"EDIT_DATE",label:"EDIT_DATE",tooltip:"",visible:false,format:{dateFormat:"longMonthDayYear"},stringFieldOption:"textbox"},
														{fieldName:"SHAPE",label:"Shape",tooltip:"",visible:false,stringFieldOption:"textbox"},
														{fieldName:"FLAG",label:"FLAG",tooltip:"",visible:false,stringFieldOption:"textbox"},
													 {fieldName:"OPID",label:"OPID",tooltip:"",visible:false,stringFieldOption:"textbox"}],description:null,showAttachments:true,mediaInfos:[]});
														// if ($scope.map.infoWindow.features) {
														// 	$scope.map.infoWindow.features.push(featureSet.features[i]);
														//
														// }
													}

													if ($scope.map.infoWindow.features) {
														for (var i = 0;i < $scope.map.infoWindow.features.length;i++) {
															featureSet.features.push($scope.map.infoWindow.features[i]);
														}

													}
													//\\if (!$scope.map.infoWindow.features) {

														$scope.map.infoWindow.hide();
														$scope.map.infoWindow.setFeatures(featureSet.features);
														$scope.map.infoWindow.show(clickPt);
												//	}

										});
								});


								// clickEvent = $scope.map.on('click', function (e) {
								// 	clickPt = e.mapPoint;
								// 	var ext = new Extent(e.mapPoint.x - 50, e.mapPoint.y - 50, e.mapPoint.x + 50, e.mapPoint.y + 50, $scope.map.spatialReference);
								// 	var q = new Query();
								// 	q.geometry = ext;
								// 	q.outFields = ['*'];
								// 	q.returnGeometry = true;
								// 	q.outSpatialReference = $scope.map.spatialReference;
								// 	var qt = new QueryTask('https://maps.raleighnc.gov/arcgis/rest/services/BaseMapBasic/MapServer/4');
								// 	qt.execute(q, function (featureSet) {
								// 		$scope.$apply();
								//
								// 		for (var i = 0; i < featureSet.features.length;i++) {
								// 			featureSet.features[i].infoTemplate = new PopupTemplate({title:"Streets",fieldInfos:[
								// 			{fieldName:"OBJECTID",label:"OBJECTID",tooltip:"",visible:false,stringFieldOption:"textbox"},
								// 			{fieldName:"STREET_ID",label:"STREET_ID",tooltip:"",visible:false,format:{places:0,digitSeparator:true},stringFieldOption:"textbox"},
								// 			{fieldName:"CARTONAME",label:"Street Name",tooltip:"",visible:true,stringFieldOption:"textbox"},
								// 			{fieldName:"FRLEFT_A",label:"From Left",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
								// 			{fieldName:"TOLEFT_A",label:"To Left",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
								// 			{fieldName:"FRRIGHT_A",label:"From Right",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
								// 			{fieldName:"TORIGHT_A",label:"To Right",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
								// 			{fieldName:"L_ZIPNAME",label:"Left City",tooltip:"",visible:true,stringFieldOption:"textbox"},
								// 			{fieldName:"R_ZIPNAME",label:"Right City",tooltip:"",visible:true,stringFieldOption:"textbox"},
								// 			{fieldName:"ZIP_L",label:"Left ZIP",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
								// 			{fieldName:"ZIP_R",label:"Right ZIP",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
								// 			{fieldName:"CLASSNAME",label:"Class",tooltip:"",visible:false,stringFieldOption:"textbox"},
								// 			{fieldName:"STATEROAD",label:"State Road #",tooltip:"",visible:true,format:{places:0,digitSeparator:false},stringFieldOption:"textbox"},
								// 			{fieldName:"CORP",label:"Corporate Limits",tooltip:"",visible:true,stringFieldOption:"textbox"},
								// 			{fieldName:"INPUT_",label:"INPUT_",tooltip:"",visible:false,stringFieldOption:"textbox"},
								// 			{fieldName:"CREATE_DATE",label:"CREATE_DATE",tooltip:"",visible:false,format:{dateFormat:"longMonthDayYear"},stringFieldOption:"textbox"},
								// 			{fieldName:"EDIT_DATE",label:"EDIT_DATE",tooltip:"",visible:false,format:{dateFormat:"longMonthDayYear"},stringFieldOption:"textbox"},
								// 			{fieldName:"SHAPE",label:"Shape",tooltip:"",visible:false,stringFieldOption:"textbox"},
								// 			{fieldName:"FLAG",label:"FLAG",tooltip:"",visible:false,stringFieldOption:"textbox"},
								// 			{fieldName:"OPID",label:"OPID",tooltip:"",visible:false,stringFieldOption:"textbox"}],description:null,showAttachments:true,mediaInfos:[]});
								//
								// 			//$scope.map.infoWindow.features.push(featureSet.features[i]);
								//
								// 		}
								// 		if (!$scope.map.infoWindow.features) {
								// 			$scope.map.infoWindow.hide();
								// 			$scope.map.infoWindow.setFeatures(featureSet.features);
								// 			$scope.map.infoWindow.show(clickPt);
								// 		} else {
								//
								// 			for (var i = 0; i < featureSet.features.length;i++) {
								// 					$scope.map.infoWindow.features.push(featureSet.features[i]);
								// 			};
								// 			$scope.map.infoWindow.hide();
								// 			$scope.map.infoWindow.setFeatures(	$scope.map.infoWindow.features);
								// 			$scope.map.infoWindow.show(clickPt);
								// 		}
								//
								// 	});
								// });
							} else {
								// if (clickEvent) {
								// 	clickEvent.remove();
								// }
							}
						});
					}
				});
			});
		},
		link: function (scope, element, attrs) {

		}
	}
});
