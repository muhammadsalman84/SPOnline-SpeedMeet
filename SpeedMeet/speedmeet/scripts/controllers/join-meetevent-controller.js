﻿'use strict';
define(["data/da-utility", "data/da-layer"],
    function (DAUtility, DALayer) {
        function JoinMeetEventController(oApplication) {
            var self = this,
            oDAUtility = new DAUtility(),
            oDALayer = new DALayer,
            CONSTANTS = oApplication.getConstants();

            this.getMeetInvitations = function () {
                
                var sMethodType = CONSTANTS.DB.HTTP.METHODS.GET,
                oHttpRequest = oDAUtility.getHttpRequest(sMethodType, "default", oApplication.getSPAppWebUrl()),
                oSpeedMeetList = oDAUtility.SPLists().SpeedMeet,
                olMeetItems,
                aData = [],
                oDeferred = $.Deferred();

                oHttpRequest.url += "lists/getbytitle('" + oSpeedMeetList.Title + "')/items?$filter=Participants1Id eq " + _spPageContextInfo.userId + " and Author/ID ne " + _spPageContextInfo.userId + " &$orderby=Created desc";
                oDALayer.SubmitWebMethod(oHttpRequest).done(function (oListItems) {
                    if (oListItems.d.results) {
                        olMeetItems = oListItems.d.results;
                        var arrayHdrs = [];
                        $.each(olMeetItems, function (index, meetItem) {
                            var row = [];

                            row.push(meetItem.ID);
                            row.push(meetItem.Title);
                            row.push(meetItem.Created);
                            //row.push(meetItem.Description1);
                            row.push(meetItem.Location1);
                            row.push(meetItem.Status.toString().replace(/"/g, ''));

                            aData.push(row);
                        });

                        arrayHdrs.push({ "title": "ID" });
                        arrayHdrs.push({ "title": oSpeedMeetList.fields.Title.title });
                        arrayHdrs.push({ "title": "Created" });
                        //arrayHdrs.push({ "title": oSpeedMeetList.fields.Description1.title });
                        arrayHdrs.push({ "title": oSpeedMeetList.fields.Location1.title });
                        arrayHdrs.push({ "title": oSpeedMeetList.fields.Status.title });
                        aData.push(arrayHdrs);

                        oDeferred.resolve(aData);
                    }
                });

                return oDeferred.promise();
            }

        }
        return JoinMeetEventController;
    });