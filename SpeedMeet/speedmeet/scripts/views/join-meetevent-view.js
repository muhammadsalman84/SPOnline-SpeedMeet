'use strict';
define(["controllers/join-meetevent-controller", "plugin-modules/base-datatable"],
     function (JoinMeetEventController, BaseDataTable) {
         function JoinMeetEventView(oApplication) {
             var oJoinMeetEventController = new JoinMeetEventController(oApplication),
                 joinModule = oApplication.modules.joinMeetEventModule,
                 dtTable, arrayColumns;

             function showMeetEvent(itemId) {
                 var waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose('Loading SpeedMeet event...', 'Please wait, this will not take longer...');
                 oApplication.oMeetEventView.showEvent(itemId)
                     .done(function () {
                         waitDialog.close();
                     });

                 //oApplication.oShowMeetEventView.loadMeetEvent(itemId, _spPageContextInfo.userId, true);
             }

             this.getMeetInvitations = function () {
                 var oBaseDataTable, columnsDef, columnsOrder, data, eventHtml, allAnchors;

                 oJoinMeetEventController.getMeetInvitations().done(function (arrayDataSet) {

                     oApplication.showHideModule(joinModule.id);    // show the Join Module

                     arrayColumns = arrayDataSet.splice(arrayDataSet.length - 1, 1);
                     arrayDataSet.join();

                     oBaseDataTable = new BaseDataTable('#tblJoinMeetEvents', arrayDataSet, arrayColumns[0]);
                     columnsDef =       // Set the buttons column width & hide the ID column (first column)
                         
                          [{     // Hide the ID column
                              "targets": [0], "visible": false, "searchable": false
                          },
                          {     // Hide the Created column
                               "targets": [2], "visible": false, "searchable": false
                          },
                          {
                              "render": function (data, type, full, meta) {
                                  eventHtml = '<a href="#" id="event' + full[0] + '" data-eventId="' + full[0] + '">' + data + '</a>';
                                  return eventHtml;
                              },
                              "targets": 1
                          },
                          {
                             "render": function (data, type, full, meta) {
                                 var statusHtml, itemStatus;
                                 statusHtml = "<strong><span class='{0}'>" + data + "</span></strong></strong>";
                                 itemStatus = oApplication.getConstants().DB.ListFields.Status;

                                 switch (data) {
                                     case itemStatus.InProgress:
                                         statusHtml = String.format(statusHtml, "status-InProgress");
                                         break;
                                     case itemStatus.Finalized:
                                         statusHtml = String.format(statusHtml, "status-Finalized");
                                         break;
                                     case itemStatus.Cancelled:
                                         statusHtml = String.format(statusHtml, "status-Cancelled");
                                         break;
                                 }

                                 return statusHtml;
                             },
                             "targets": [4]
                          }];

                     columnsOrder = [[2, "desc"]];      // Order by created date (descending)
                     oBaseDataTable.clearDataTable();
                     oBaseDataTable.bindDataTable(columnsDef, columnsOrder);

                     allAnchors = $('#tblJoinMeetEvents tbody').find("a");

                     // Bind the click event with the Events Anchors
                     $.each(allAnchors, function (index, eventAnchor) {
                         $(eventAnchor).bind('click', function () {
                             var eventId = $(this).attr("data-eventId");
                             showMeetEvent(eventId);
                         });
                     });

                 });
             }
         }

         return JoinMeetEventView;
     });