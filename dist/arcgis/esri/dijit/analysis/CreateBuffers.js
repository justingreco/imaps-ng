//>>built
require({cache:{"url:esri/dijit/analysis/templates/CreateBuffers.html":'\x3cdiv class\x3d"esriAnalysis"\x3e\r\n    \x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" style\x3d"margin-top:0.5em; margin-bottom: 0.5em;"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"_bufferToolContentTitle" class\x3d"analysisTitle"\x3e\r\n         \x3ctable class\x3d"esriFormTable" \x3e\r\n            \x3ctr\x3e\r\n              \x3ctd class\x3d"esriToolIconTd"\x3e\x3cdiv class\x3d"buffersIcon"\x3e\x3c/div\x3e\x3c/td\x3e\r\n              \x3ctd class\x3d"esriAlignLeading esriAnalysisTitle" data-dojo-attach-point\x3d"_toolTitle"\x3e${i18n.createBuffers}\x3c/td\x3e\r\n              \x3ctd\x3e\r\n                \x3cdiv class\x3d"esriFloatTrailing" style\x3d"padding:0;"\x3e\r\n                    \x3cdiv class\x3d"esriFloatLeading"\x3e\r\n                      \x3ca href\x3d"#" class\x3d\'esriFloatLeading helpIcon\' esriHelpTopic\x3d"toolDescription"\x3e\x3c/a\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv class\x3d"esriFloatTrailing"\x3e\r\n                      \x3ca href\x3d"#" data-dojo-attach-point\x3d"_closeBtn" title\x3d"${i18n.close}" class\x3d"esriAnalysisCloseIcon"\x3e\x3c/a\x3e\r\n                    \x3c/div\x3e              \r\n                \x3c/div\x3e  \r\n              \x3c/td\x3e\r\n            \x3c/tr\x3e\r\n         \x3c/table\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv style\x3d"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"_form" readOnly\x3d"true"\x3e\r\n     \x3ctable class\x3d"esriFormTable"  data-dojo-attach-point\x3d"_bufferTable"\x3e\r\n       \x3ctbody\x3e\r\n        \x3ctr data-dojo-attach-point\x3d"_titleRow"\x3e\r\n          \x3ctd colspan\x3d"2" class\x3d"sectionHeader esriLeadingMargin1" data-dojo-attach-point\x3d"_bufferToolDescription" \x3e\r\n            \x3cdiv\x3e${i18n.bufferDefine}\x3c/div\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n        \x3ctr data-dojo-attach-point\x3d"_analysisLabelRow" style\x3d"display:none;"\x3e\r\n         \x3ctd colspan\x3d"2" style\x3d"padding-bottom:0;"\x3e\r\n           \x3clabel class\x3d"esriFloatLeading  esriTrailingMargin025 esriAnalysisNumberLabel"\x3e${i18n.oneLabel}\x3c/label\x3e\r\n           \x3clabel class\x3d"esriAnalysisStepsLabel"\x3e${i18n.analysisLayerLabel}\x3c/label\x3e\r\n         \x3c/td\x3e\r\n         \x3ctd class\x3d"shortTextInput" style\x3d"padding-bottom:0;"\x3e\r\n           \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' esriHelpTopic\x3d"inputLayer"\x3e\x3c/a\x3e\r\n         \x3c/td\x3e  \r\n        \x3c/tr\x3e \r\n        \x3ctr data-dojo-attach-point\x3d"_selectAnalysisRow" style\x3d"display:none;"\x3e\r\n          \x3ctd colspan\x3d"3" style\x3d"padding-top:0;"\x3e\r\n            \x3cselect class\x3d"esriLeadingMargin1 longInput esriLongLabel"  style\x3d"margin-top:1.0em;" data-dojo-type\x3d"dijit/form/Select" data-dojo-attach-point\x3d"_analysisSelect" data-dojo-attach-event\x3d"onChange:_handleAnalysisLayerChange"\x3e\x3c/select\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e          \r\n        \x3ctr\x3e\r\n          \x3ctd class\x3d"longTextInput" style\x3d"padding-top:5px;"\x3e\r\n            \x3clabel data-dojo-attach-point\x3d"_labelOne" class\x3d"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel"\x3e${i18n.oneLabel}\x3c/label\x3e\r\n            \x3clabel data-dojo-attach-point\x3d"_polylabel" class\x3d"esriAnalysisStepsLabel"\x3e${i18n.sizeLabel}\x3c/label\x3e\r\n          \x3c/td\x3e\r\n          \x3ctd\x3e\r\n            \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' data-dojo-attach-point\x3d"_analysisFieldHelpLink" esriHelpTopic\x3d"BufferSize"\x3e\x3c/a\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n        \x3ctr\x3e\r\n          \x3ctd colspan\x3d"2"\x3e\r\n            \x3ctable\x3e\r\n              \x3ctr\x3e\r\n                \x3ctd\x3e\r\n                  \x3cdiv class\x3d"esriLeadingMargin4 bufferSelector selected" data-dojo-attach-point\x3d"_Distance" \x3e\r\n                    \x3cdiv class\x3d"bufferIcon bufferDistanceIcon"\x3e\x3c/div\x3e\r\n                    \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.distance}\x3c/label\x3e\x3c/div\x3e\r\n                  \x3c/div\x3e\r\n                \x3c/td\x3e\r\n                \x3ctd\x3e\r\n                  \x3cdiv class\x3d"bufferSelector" data-dojo-attach-point\x3d"_Attribute"\x3e\r\n                    \x3cdiv class\x3d"bufferIcon bufferAttributeIcon"\x3e\x3c/div\x3e\r\n                    \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.field}\x3c/label\x3e\x3c/div\x3e\r\n                  \x3c/div\x3e\r\n                \x3c/td\x3e\r\n              \x3c/tr\x3e\r\n            \x3c/table\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n        \x3ctr\x3e\r\n         \x3ctd colspan\x3d"2"\x3e\r\n         \x3ctable style\x3d"width:99%;"\x3e\r\n          \x3ctr\x3e\r\n          \x3ctd style\x3d"width:45%;"\x3e\r\n            \x3cinput type\x3d"text" class\x3d"esriLeadingMargin1" data-dojo-type\x3d"dijit/form/ValidationTextBox" data-dojo-props\x3d"intermediateChanges:true,value:\'1\',required:true,missingMessage:\'${i18n.distanceMsg}\'" data-dojo-attach-point\x3d"_bufferDist" style\x3d"width:95%;"\x3e\x3c/input\x3e\r\n            \x3cselect class\x3d"esriLeadingMargin1" data-dojo-attach-point\x3d"_bufferDistAttribute" data-dojo-type\x3d"dijit/form/Select" style\x3d"display:none; width:95%;table-layout:fixed;"\x3e\x3c/select\x3e\r\n          \x3c/td\x3e\r\n          \x3ctd style\x3d"width:55%;"\x3e \r\n            \x3c!-- Default, Centimeters, DecimalDegrees, Feet, Inches, Kilometers, Meters, Miles, Millimeters, NauticalMiles, Points, Yards --\x3e\r\n            \x3cselect class\x3d"esriLeadingMargin1 mediumInput esriAnalysisSelect" data-dojo-type\x3d"dijit/form/Select" data-dojo-attach-point\x3d"_bufferUnits" style\x3d"width:90%;table-layout:fixed;"\x3e\r\n              \x3coption value\x3d"Miles"\x3e${i18n.miles}\x3c/option\x3e\r\n              \x3coption value\x3d"Yards"\x3e${i18n.yards}\x3c/option\x3e\r\n              \x3coption value\x3d"Feet"\x3e${i18n.feet}\x3c/option\x3e\r\n              \x3coption type\x3d"separator"\x3e\x3c/option\x3e\r\n              \x3coption value\x3d"Kilometers"\x3e${i18n.kilometers}\x3c/option\x3e\r\n              \x3coption value\x3d"Meters"\x3e${i18n.meters}\x3c/option\x3e\r\n              \x3coption value\x3d"NauticalMiles"\x3e${i18n.nautMiles}\x3c/option\x3e\r\n            \x3c/select\x3e\r\n          \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3ctr data-dojo-attach-point\x3d"_sizeHelpRow"\x3e\r\n            \x3ctd class\x3d"shortTextInput" colspan\x3d"2" align\x3d"center" data-dojo-attach-point\x3d"_sizeHelp"\x3e\r\n              \x3clabel class\x3d"esriLeadingMargin1 esriSmallLabel"\x3e${i18n.sizeHelp}\x3c/label\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n         \x3c/table\x3e\r\n         \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n\r\n        \x3ctr data-dojo-attach-point\x3d"_optionsRow"\x3e\r\n          \x3ctd colspan\x3d"2" style\x3d"padding:5px 0px;"\x3e\r\n            \x3cdiv class\x3d"esriLeadingMargin2 optionsClose" data-dojo-attach-point\x3d"_optionsDiv"\x3e\r\n              \x3cdiv class\x3d"dijitTreeExpando" data-dojo-attach-event\x3d"onclick:_handleOptionsBtnClick"\x3e\x3clabel class\x3d"esriLeadingMargin2 noWrapLabel"\x3e${i18n.optionsLabel}\x3c/label\x3e\x3c/div\x3e\r\n              \x3ca style\x3d"position:relative; top:-16px; left:1px; "href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' data-dojo-attach-point\x3d"_bufferOptionsHelpLink" esriHelpTopic\x3d"OptionNolayer"\x3e\x3c/a\x3e\r\n              \x3ctable class\x3d"esriFormTable optionsTable"\x3e\r\n                \x3ctbody\x3e\r\n\r\n                \x3ctr\x3e\r\n                  \x3ctd colspan\x3d"2" align\x3d""\x3e\r\n                    \x3cdiv class\x3d"esriFloatLeading esriLeadingMargin2"\x3e${i18n.typeLabel}\x3c/div\x3e\r\n                  \x3c/td\x3e\r\n                \x3c/tr\x3e \r\n\r\n                \x3ctr\x3e\r\n                  \x3ctd\x3e\r\n                    \x3ctable\x3e\r\n                      \x3ctr\x3e\r\n                        \x3ctd\x3e\r\n                          \x3cdiv class\x3d"esriLeadingMargin4 bufferSelector selected" data-dojo-attach-point\x3d"_Overlap"\x3e\r\n                            \x3cdiv class\x3d"bufferIcon bufferOverlapIcon"\x3e\x3c/div\x3e\r\n                            \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.overlap}\x3c/label\x3e\x3c/div\x3e\r\n                          \x3c/div\x3e\r\n                        \x3c/td\x3e\r\n                        \x3ctd\x3e\r\n                          \x3cdiv class\x3d"bufferSelector" data-dojo-attach-point\x3d"_Dissolve"\x3e\r\n                            \x3cdiv class\x3d"bufferIcon bufferDissolveIcon"\x3e\x3c/div\x3e\r\n                            \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.dissolve}\x3c/label\x3e\x3c/div\x3e\r\n                          \x3c/div\x3e\r\n                        \x3c/td\x3e\r\n                      \x3c/tr\x3e\r\n                    \x3c/table\x3e\r\n                  \x3c/td\x3e\r\n                \x3c/tr\x3e\r\n\r\n                \x3ctr\x3e\r\n                  \x3ctd colspan\x3d"2" align\x3d""\x3e\r\n                    \x3ctable data-dojo-attach-point\x3d"polygonTypes" style\x3d"display:none;"\x3e\r\n                      \x3ctr\x3e\r\n                        \x3ctd colspan\x3d"2" align\x3d""\x3e\r\n                          \x3cdiv class\x3d"esriFloatLeading esriLeadingMargin2"\x3e${i18n.areaofInputPoly}\x3c/div\x3e\r\n                        \x3c/td\x3e\r\n                      \x3c/tr\x3e\r\n                      \x3ctr\x3e\r\n                        \x3ctd\x3e\r\n                          \x3ctable\x3e\r\n                            \x3ctr\x3e\r\n                              \x3ctd\x3e\r\n                                \x3cdiv class\x3d"esriLeadingMargin4 bufferSelector selected" data-dojo-attach-point\x3d"_Include"\x3e\r\n                                  \x3cdiv class\x3d"bufferIcon bufferIncludeIcon"\x3e\x3c/div\x3e\r\n                                  \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.include}\x3c/label\x3e\x3c/div\x3e\r\n                                \x3c/div\x3e\r\n                              \x3c/td\x3e\r\n                              \x3ctd\x3e\r\n                                \x3cdiv class\x3d"bufferSelector" data-dojo-attach-point\x3d"_Exclude"\x3e\r\n                                  \x3cdiv class\x3d"bufferIcon bufferExcludeIcon"\x3e\x3c/div\x3e\r\n                                  \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.exclude}\x3c/label\x3e\x3c/div\x3e\r\n                                \x3c/div\x3e\r\n                              \x3c/td\x3e\r\n                            \x3c/tr\x3e\r\n                          \x3c/table\x3e\r\n                        \x3c/td\x3e\r\n                      \x3c/tr\x3e\r\n                    \x3c/table\x3e\r\n                  \x3c/td\x3e\r\n                \x3c/tr\x3e\r\n\r\n\r\n\r\n                \x3ctr\x3e\r\n                  \x3ctd colspan\x3d"2"\x3e\r\n                    \x3cdiv\x3e\r\n                    \x3ctable data-dojo-attach-point\x3d"sideTypes" style\x3d"display:none;"\x3e\r\n                      \x3ctr\x3e\r\n                        \x3ctd align\x3d"center" colspan\x3d"3"\x3e\r\n                          \x3cdiv class\x3d"esriFloatLeading esriLeadingMargin2"\x3e${i18n.sideType}\x3c/div\x3e\r\n                        \x3c/td\x3e\r\n                      \x3c/tr\x3e\r\n                      \x3ctr\x3e\r\n                          \x3ctd\x3e\r\n                            \x3cdiv class\x3d"esriLeadingMargin4 bufferSelector selected" data-dojo-attach-point\x3d"_Around"\x3e\r\n                              \x3cdiv class\x3d"bufferIcon bufferAroundIcon"\x3e\x3c/div\x3e\r\n                              \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.around}\x3c/label\x3e\x3c/div\x3e\r\n                            \x3c/div\x3e\r\n                          \x3c/td\x3e\r\n                          \x3ctd\x3e\r\n                            \x3cdiv class\x3d"bufferSelector" data-dojo-attach-point\x3d"_Left" \x3e\r\n                              \x3cdiv class\x3d"bufferIcon bufferLeftIcon"\x3e\x3c/div\x3e\r\n                              \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.left}\x3c/label\x3e\x3c/div\x3e\r\n                            \x3c/div\x3e\r\n                          \x3c/td\x3e\r\n                          \x3ctd\x3e\r\n                            \x3cdiv class\x3d"bufferSelector" data-dojo-attach-point\x3d"_Right"\x3e\r\n                              \x3cdiv class\x3d"bufferIcon bufferRightIcon"\x3e\x3c/div\x3e\r\n                              \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.right}\x3c/label\x3e\x3c/div\x3e\r\n                            \x3c/div\x3e\r\n                          \x3c/td\x3e\r\n                      \x3c/tr\x3e\r\n                     \x3c/table\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv\x3e\r\n                     \x3ctable data-dojo-attach-point\x3d"endTypes" style\x3d"display:none;"\x3e\r\n                      \x3ctr\x3e\r\n                        \x3ctd align\x3d"center" colspan\x3d"2"\x3e\r\n                          \x3cdiv class\x3d"esriFloatLeading esriLeadingMargin2"\x3e${i18n.endType}\x3c/div\x3e\r\n                        \x3c/td\x3e\r\n                      \x3c/tr\x3e\r\n                      \x3ctr\x3e\r\n                          \x3ctd\x3e\r\n                            \x3cdiv class\x3d"esriLeadingMargin4 bufferSelector selected" data-dojo-attach-point\x3d"_Round" \x3e\r\n                              \x3cdiv class\x3d"bufferIcon bufferRoundIcon"\x3e\x3c/div\x3e\r\n                              \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.round}\x3c/label\x3e\x3c/div\x3e\r\n                            \x3c/div\x3e\r\n                          \x3c/td\x3e\r\n                          \x3ctd\x3e\r\n                            \x3cdiv class\x3d"bufferSelector" data-dojo-attach-point\x3d"_Flat"\x3e\r\n                              \x3cdiv class\x3d"bufferIcon bufferFlatIcon"\x3e\x3c/div\x3e\r\n                              \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.flat}\x3c/label\x3e\x3c/div\x3e\r\n                            \x3c/div\x3e\r\n                          \x3c/td\x3e\r\n                      \x3c/tr\x3e\r\n                    \x3c/table\x3e\r\n                    \x3c/div\x3e\r\n                  \x3c/td\x3e\r\n                \x3c/tr\x3e\r\n\r\n                \x3ctr\x3e\r\n                  \x3ctd colspan\x3d"2" align\x3d"center"\x3e\r\n                    \x3ctable data-dojo-attach-point\x3d"ringTypes" style\x3d"display:none;"\x3e\r\n                      \x3ctr\x3e\r\n                        \x3ctd colspan\x3d2 align\x3d"center"\x3e\r\n                          \x3cdiv class\x3d"esriFloatLeading esriLeadingMargin2"\x3e${i18n.multipleDistance}\x3c/div\x3e\r\n                        \x3c/td\x3e\r\n                      \x3c/tr\x3e\r\n                      \x3ctr\x3e\r\n                          \x3ctd\x3e\r\n                            \x3cdiv\x3e\r\n                            \x3ctable\x3e\r\n                            \x3ctr\x3e\r\n                            \x3ctd\x3e\r\n                              \x3cdiv class\x3d"esriLeadingMargin4 bufferSelector selected" data-dojo-attach-point\x3d"_Rings"\x3e\r\n                                \x3cdiv class\x3d"bufferIcon bufferRingsIcon"\x3e\x3c/div\x3e\r\n                                \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.rings}\x3c/label\x3e\x3c/div\x3e\r\n                              \x3c/div\x3e\r\n                            \x3c/td\x3e\r\n                            \x3ctd\x3e\r\n                              \x3cdiv class\x3d"bufferSelector" data-dojo-attach-point\x3d"_Disks"\x3e\r\n                                \x3cdiv class\x3d"bufferIcon bufferDisksIcon"\x3e\x3c/div\x3e\r\n                                \x3cdiv\x3e\x3clabel class\x3d"esriSelectLabel"\x3e${i18n.disks}\x3c/label\x3e\x3c/div\x3e\r\n                              \x3c/div\x3e\r\n                            \x3c/td\x3e\r\n                            \x3c/tr\x3e\r\n                            \x3c/table\x3e\r\n                            \x3c/div\x3e\r\n                          \x3c/td\x3e  \r\n                      \x3c/tr\x3e\r\n                    \x3c/table\x3e\r\n                  \x3c/td\x3e\r\n                \x3c/tr\x3e\r\n    \r\n\r\n\r\n                \x3c/tbody\x3e\r\n              \x3c/table\x3e\r\n            \x3c/div\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n    \r\n        \x3ctr\x3e\r\n          \x3ctd  class\x3d"longTextInput" style\x3d"padding:5px 0px;"\x3e\r\n            \x3clabel data-dojo-attach-point\x3d"_labelOne" class\x3d"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel"\x3e${i18n.twoLabel}\x3c/label\x3e\r\n            \x3clabel data-dojo-attach-point\x3d"_polylabel" class\x3d"esriAnalysisStepsLabel"\x3e${i18n.resultLabel}\x3c/label\x3e\r\n          \x3c/td\x3e\r\n          \x3ctd\x3e\r\n            \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' data-dojo-attach-point\x3d"_analysisFieldHelpLink" esriHelpTopic\x3d"BufferLayer"\x3e\x3c/a\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n        \x3ctr\x3e\r\n          \x3ctd colspan\x3d"2"\x3e\r\n            \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" class\x3d"esriLeadingMargin1 longInput" data-dojo-props\x3d"required:true,trim:true" data-dojo-attach-point\x3d"outputLayerInput"  value\x3d""\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n        \x3ctr\x3e\r\n          \x3ctd colspan\x3d"3"\x3e\r\n             \x3cdiv data-dojo-attach-point\x3d"_chooseFolderRow"\x3e\r\n               \x3clabel style\x3d"width:9px;font-size:smaller;"\x3e${i18n.saveResultIn}\x3c/label\x3e\r\n               \x3cinput class\x3d"longInput" data-dojo-attach-point\x3d"_webMapFolderSelect" data-dojo-type\x3d"dijit/form/FilteringSelect" trim\x3d"true" style\x3d"width:60%;"\x3e\x3c/input\x3e\r\n             \x3c/div\x3e              \r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e         \r\n       \x3c/tbody\x3e\r\n      \x3c/table\x3e\r\n\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"_bufferToolContentButtons" style\x3d"padding:5px;margin-top:5px;border-top:solid 1px #BBB;"\x3e\r\n      \x3cdiv class\x3d"esriExtentCreditsCtr"\x3e\r\n        \x3ca class\x3d"esriFloatTrailing esriSmallFont"  href\x3d"#" data-dojo-attach-point\x3d"_showCreditsLink" data-dojo-attach-event\x3d"onclick:_handleShowCreditsClick"\x3e${i18n.showCredits}\x3c/a\x3e\r\n       \x3clabel data-dojo-attach-point\x3d"_chooseExtentDiv" class\x3d"esriSelectLabel esriExtentLabel"\x3e\r\n         \x3cinput type\x3d"radio" data-dojo-attach-point\x3d"_useExtentCheck" data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-props\x3d"checked:true" name\x3d"extent" value\x3d"true"/\x3e\r\n           ${i18n.useMapExtent}\r\n       \x3c/label\x3e\r\n      \x3c/div\x3e\r\n      \x3cbutton data-dojo-type\x3d"dijit/form/Button" type\x3d"submit" data-dojo-attach-point\x3d"_saveBtn" class\x3d"esriLeadingMargin4 esriAnalysisSubmitButton" data-dojo-attach-event\x3d"onClick:_handleSaveBtnClick"\x3e\r\n          ${i18n.runAnalysis}\r\n      \x3c/button\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-type\x3d"dijit/Dialog" title\x3d"${i18n.creditTitle}" data-dojo-attach-point\x3d"_usageDialog" style\x3d"width:40em;"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/analysis/CreditEstimator"  data-dojo-attach-point\x3d"_usageForm"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e    \r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/analysis/CreateBuffers","require dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/json dojo/has dojo/json dojo/string dojo/dom-style dojo/dom-attr dojo/dom-construct dojo/query dojo/dom-class dojo/number dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dijit/_OnDijitClickMixin dijit/_FocusMixin dijit/registry dijit/form/Button dijit/form/CheckBox dijit/form/Form dijit/form/Select dijit/form/TextBox dijit/form/ValidationTextBox dijit/layout/ContentPane dijit/form/FilteringSelect dijit/Dialog ../../kernel ../../lang ./AnalysisBase ./_AnalysisOptions ./utils ./CreditEstimator dojo/i18n!../../nls/jsapi dojo/text!./templates/CreateBuffers.html".split(" "),
function(n,q,d,h,e,f,r,C,m,b,p,D,E,c,k,s,t,u,v,w,F,G,H,I,J,K,L,M,N,O,x,l,y,z,g,P,A,B){n=q([s,t,u,v,w,y,z],{declaredClass:"esri.dijit.analysis.CreateBuffers",templateString:B,widgetsInTemplate:!0,inputLayer:null,inputType:null,outputLayerName:null,bufferDistance:null,units:null,i18n:null,toolName:"CreateBuffers",helpFileName:"CreateBuffers",resultParameter:"BufferLayer",constructor:function(a,b){this._pbConnects=[];a.containerNode&&(this.container=a.containerNode)},destroy:function(){this.inherited(arguments);
h.forEach(this._pbConnects,e.disconnect);delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments);d.mixin(this.i18n,A.bufferTool)},postCreate:function(){this.inherited(arguments);c.add(this._form,"esriSimpleForm");this.outputLayerInput.set("validator",d.hitch(this,this.validateServiceName));this._buildUI()},startup:function(){},_onClose:function(a){a&&(this._save(),this.emit("save",{save:!0}));this.emit("close",{save:a})},_toUpperFirstLetter:function(a){return a.slice(0,1).toUpperCase()+
a.slice(1)},_handleSaveBtnClick:function(a){a={};var b={},c;if(this._form.validate()){this._saveBtn.set("disabled",!0);a.InputLayer=f.toJson(g.constructAnalysisInputLyrObj(this.inputLayer));a.DissolveType=this._DissolveType&&"dissolve"===this._DissolveType?"Dissolve":"None";"attribute"===this.bufferDistType?a.Field=this._bufferDistAttribute.get("value"):a.Distances=this.bufferDistance;a.Units=this._bufferUnits.get("value");this.bufferDistance.length&&(this._RingType||(this._RingType="rings"),a.RingType=
"rings"===this._RingType?"Rings":"Disks");if("esriGeometryPolyline"===this.inputLayer.geometryType||"esriGeometryPolygon"===this.inputLayer.geometryType)a.SideType="esriGeometryPolyline"===this.inputLayer.geometryType?this._SideType&&"left"===this._SideType?"Left":this._SideType&&"right"===this._SideType?"Right":"Full":this._SideType&&"outside"===this._SideType?"Outside":"Full",a.EndType=this._EndType&&"flat"===this._EndType?"Flat":"Round";this.returnFeatureCollection||(a.OutputName=f.toJson({serviceProperties:{name:this.outputLayerInput.get("value")}}));
this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=f.toJson({extent:this.map.extent._normalize(!0)}));this.returnFeatureCollection&&(c={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(c.extent=this.map.extent._normalize(!0)),a.context=f.toJson(c));b.jobParams=a;b.itemParams={description:m.substitute(this.i18n.itemDescription,{layername:this.inputLayer.name,distance_field:a.Distances||a.Field,units:a.Units}),tags:m.substitute(this.i18n.itemTags,
{layername:this.inputLayer.name}),snippet:this.i18n.itemSnippet};this.showSelectFolder&&(b.itemParams.folder=this.get("folderId"));this.execute(b)}},_handleLayerChange:function(a){},_handleRadiusTypeChange:function(a){this.bufferDistType=a;c.remove(this._Distance,"selected");c.remove(this._Attribute,"selected");var d=this._bufferDist.get("value").split(" ");"attribute"===a?(b.set(this._bufferDistAttribute.domNode,"display","block"),b.set(this._bufferDist.domNode,"display","none"),b.set(this._sizeHelpRow,
"display","none"),b.set(this.ringTypes,"display","none"),"polygon"===this.inputType?(b.set(this.polygonTypes,"display","block"),b.set(this.sideTypes,"display","none"),b.set(this.endTypes,"display","none")):"line"===this.inputType&&(b.set(this.sideTypes,"display","block"),b.set(this.endTypes,"display","block"),b.set(this.polygonTypes,"display","none")),c.add(this._Attribute,"selected")):"distance"===a&&(b.set(this._bufferDistAttribute.domNode,"display","none"),b.set(this._bufferDist.domNode,"display",
"block"),b.set(this._sizeHelpRow,"display","table-row"),c.add(this._Distance,"selected"),1<d.length?(b.set(this.ringTypes,"display","block"),b.set(this.sideTypes,"display","none"),b.set(this.endTypes,"display","none"),b.set(this.polygonTypes,"display","none")):"polygon"===this.inputType?(b.set(this.ringTypes,"display","none"),b.set(this.sideTypes,"display","none"),b.set(this.endTypes,"display","none"),b.set(this.polygonTypes,"display","block")):"line"===this.inputType&&(b.set(this.ringTypes,"display",
"none"),b.set(this.sideTypes,"display","block"),b.set(this.endTypes,"display","block"),b.set(this.polygonTypes,"display","none")))},_handleDissolveTypeChange:function(a){this._DissolveType=a;c.remove(this._Overlap,"selected");c.remove(this._Dissolve,"selected");c.add("none"===a?this._Overlap:this._Dissolve,"selected")},_handleRingTypeChange:function(a){this._RingType=a;c.remove(this._Rings,"selected");c.remove(this._Disks,"selected");c.add("rings"===a?this._Rings:this._Disks,"selected")},_handlePolygonTypeChange:function(a){this._SideType=
a;c.remove(this._Include,"selected");c.remove(this._Exclude,"selected");c.add("full"===a?this._Include:this._Exclude,"selected")},_handleSideTypeChange:function(a,b){this._SideType=b;c.remove(this._Around,"selected");c.remove(this._Left,"selected");c.remove(this._Right,"selected");c.add(a,"selected")},_handleEndTypeChange:function(a){this._EndType=a;c.remove(this._Round,"selected");c.remove(this._Flat,"selected");c.add("round"===a?this._Round:this._Flat,"selected")},_handleOptionsBtnClick:function(){c.contains(this._optionsDiv,
"disabled")||(c.contains(this._optionsDiv,"optionsClose")?(c.remove(this._optionsDiv,"optionsClose"),c.add(this._optionsDiv,"optionsOpen")):c.contains(this._optionsDiv,"optionsOpen")&&(c.remove(this._optionsDiv,"optionsOpen"),c.add(this._optionsDiv,"optionsClose")))},_handleDistanceChange:function(){var a=d.trim(this._bufferDist.get("value")).split(" "),c=[];1<a.length?(b.set(this.ringTypes,"display","block"),b.set(this.sideTypes,"display","none"),b.set(this.endTypes,"display","none"),b.set(this.polygonTypes,
"display","none")):("line"===this.inputType?(b.set(this.sideTypes,"display","block"),b.set(this.endTypes,"display","block")):"polygon"===this.inputType&&b.set(this.polygonTypes,"display","block"),b.set(this.ringTypes,"display","none"));h.forEach(a,function(a){c.push(k.parse(a))});this.bufferDistance=c},_handleShowCreditsClick:function(a){a.preventDefault();a={};if(this._form.validate()){a.InputLayer=f.toJson(g.constructAnalysisInputLyrObj(this.inputLayer));a.DissolveType=this._DissolveType&&"dissolve"===
this._DissolveType?"Dissolve":"None";"attribute"===this.bufferDistType?a.Field=this._bufferDistAttribute.get("value"):a.Distances=f.toJson(this.bufferDistance);a.Units=this._bufferUnits.get("value");this.bufferDistance.length&&(this._RingType||(this._RingType="rings"),a.RingType="rings"===this._RingType?"Rings":"Disks");if("esriGeometryPolyline"===this.inputLayer.geometryType||"esriGeometryPolygon"===this.inputLayer.geometryType)a.SideType="esriGeometryPolyline"===this.inputLayer.geometryType?this._SideType&&
"left"===this._SideType?"Left":this._SideType&&"right"===this._SideType?"Right":"Full":this._SideType&&"outside"===this._SideType?"Outside":"Full",a.EndType=this._EndType&&"flat"===this._EndType?"Flat":"Round";this.returnFeatureCollection||(a.OutputName=f.toJson({serviceProperties:{name:this.outputLayerInput.get("value")}}));this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=f.toJson({extent:this.map.extent._normalize(!0)}));this.getCreditsEstimate(this.toolName,a).then(d.hitch(this,
function(a){this._usageForm.set("content",a);this._usageDialog.show()}))}},_save:function(){},_buildUI:function(){var a=!0;g.initHelpLinks(this.domNode,this.showHelp);this.get("showSelectAnalysisLayer")&&(!this.get("inputLayer")&&this.get("inputLayers")&&this.set("inputLayer",this.inputLayers[0]),g.populateAnalysisLayers(this,"inputLayer","inputLayers"));g.addReadyToUseLayerOption(this,[this._analysisSelect]);this.outputLayerName&&(this.outputLayerInput.set("value",this.outputLayerName),a=!1);this.inputLayer&&
this._updateAnalysisLayerUI(a);this._bufferDist.set("validator",d.hitch(this,this.validateDistance));b.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none");this.showSelectFolder&&this.getFolderStore().then(d.hitch(this,function(a){this.folderStore=a;g.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}));b.set(this._chooseExtentDiv,"display",
!0===this.showChooseExtent?"inline-block":"none");b.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none");this._loadConnections()},_updateAnalysisLayerUI:function(a){if(this.inputLayer){p.set(this._bufferToolDescription,"innerHTML",m.substitute(this.i18n.bufferDefine,{layername:this.inputLayer.name}));a&&(this.outputLayerName=m.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name}));this._bufferDistAttribute.removeOption(this._bufferDistAttribute.getOptions());
var c=[];h.forEach(this.inputLayer.fields,function(a){if("esriFieldTypeDouble"===a.type||"esriFieldTypeInteger"===a.type||"esriFieldTypeSmallInteger"===a.type||"esriFieldTypeSingle"===a.type)c.push({value:a.name,label:l.isDefined(a.alias)&&""!==a.alias?a.alias:a.name})},this);this._bufferDistAttribute.addOption(c);p.set(this._bufferOptionsHelpLink,"esriHelpTopic","polygon"===this.inputType?"OptionPoly":"line"===this.inputType?"OptionLine":"OptionPoint");"line"===this.inputType?(b.set(this.sideTypes,
"display","block"),b.set(this.endTypes,"display","block")):"polygon"===this.inputType&&b.set(this.polygonTypes,"display","block")}this.outputLayerName&&this.outputLayerInput.set("value",this.outputLayerName);!this.bufferDistance||a?(this.bufferDistance=[],this.bufferDistance.push(this._bufferDist.get("value"))):this._bufferDist.set("value",this.bufferDistance.toString().replace(/,/g," "));this.units&&this._bufferUnits.set("value",this.units)},_handleAnalysisLayerChange:function(a){"browse"===a?(this._analysisquery||
(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery),this._browsedlg.show()):(this.inputLayer=this.inputLayers[a],this._updateAnalysisLayerUI(!0))},validateDistance:function(){var a=this,b,c=[],e,f;this._handleDistanceChange();b=d.trim(this._bufferDist.get("value")).split(" ");if(0===b.length)return!1;h.forEach(b,function(b){b=k.parse(b);if(isNaN(b))return c.push(0),!1;e=k.format(b,{locale:"root"});l.isDefined(e)?l.isDefined(e)||
(e=k.format(b,{locale:"en-us"})):e=k.format(b,{locale:"en"});l.isDefined(e)&&(f=d.trim(e).match(/\D/g));f&&h.forEach(f,function(b){"."===b||","===b?c.push(1):"-"===b&&"polygon"===a.inputType?c.push(1):c.push(0)})});return-1!==h.indexOf(c,0)?!1:!0},_loadConnections:function(){this.on("start",d.hitch(this,"_onClose",!0));this._connect(this._closeBtn,"onclick",d.hitch(this,"_onClose",!1));e.connect(this._Distance,"onclick",d.hitch(this,"_handleRadiusTypeChange","distance"));e.connect(this._Attribute,
"onclick",d.hitch(this,"_handleRadiusTypeChange","attribute"));e.connect(this._Overlap,"onclick",d.hitch(this,"_handleDissolveTypeChange","none"));e.connect(this._Dissolve,"onclick",d.hitch(this,"_handleDissolveTypeChange","dissolve"));e.connect(this._Include,"onclick",d.hitch(this,"_handlePolygonTypeChange","full"));e.connect(this._Exclude,"onclick",d.hitch(this,"_handlePolygonTypeChange","outside"));e.connect(this._Rings,"onclick",d.hitch(this,"_handleRingTypeChange","rings"));e.connect(this._Disks,
"onclick",d.hitch(this,"_handleRingTypeChange","disks"));e.connect(this._Around,"onclick",d.hitch(this,"_handleSideTypeChange",this._Around,"full"));e.connect(this._Left,"onclick",d.hitch(this,"_handleSideTypeChange",this._Left,"left"));e.connect(this._Right,"onclick",d.hitch(this,"_handleSideTypeChange",this._Right,"right"));e.connect(this._Round,"onclick",d.hitch(this,"_handleEndTypeChange","round"));e.connect(this._Flat,"onclick",d.hitch(this,"_handleEndTypeChange","flat"))},_handleBrowseItemsSelect:function(a){a&&
a.selection&&g.addAnalysisReadyLayer({item:a.selection,layers:this.inputLayers,layersSelect:this._analysisSelect,browseDialog:this._browsedlg,widget:this}).always(d.hitch(this,this._updateAnalysisLayerUI,!0))},_setAnalysisGpServerAttr:function(a){a&&(this.analysisGpServer=a,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayerAttr:function(a){l.isDefined(a)&&("esriGeometryPolygon"===a.geometryType?(this.inputLayer=a,this.inputType="polygon"):"esriGeometryPolyline"===
a.geometryType?(this.inputLayer=a,this.inputType="line"):"esriGeometryPoint"===a.geometryType&&(this.inputLayer=a,this.inputType="point"))},_setInputLayersAttr:function(a){this.inputLayers=a},_setLayerAttr:function(a){"esriGeometryPolygon"===a.geometryType?this.inputType="polygon":"esriGeometryPolyline"===a.geometryType?this.inputType="line":"esriGeometryPoint"===a.geometryType&&(this.inputType="point");this.inputLayer=a},_setLayersAttr:function(a){this._setLayerAttr(a)},_setDisableRunAnalysisAttr:function(a){this._saveBtn.set("disabled",
a)},validateServiceName:function(a){return g.validateServiceName(a,{textInput:this.outputLayerInput})},_setUnitsAttr:function(a){this.units=a},_getUnitsAttr:function(){return this.units=this._bufferUnits.get("value")},_connect:function(a,b,c){this._pbConnects.push(e.connect(a,b,c))}});r("extend-esri")&&d.setObject("dijit.analysis.CreateBuffers",n,x);return n});