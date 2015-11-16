'use strict';
define(["controllers/announcement-controller"],
     function (AnnouncementsController) {
         function AnnouncementView(oApplication) {

             var successAnnouncements = function (arrayAnnoucements) {
                 if (arrayAnnoucements[0] > 0) {
                     $("#allAnnouncements li").remove();
                     var badgeElement = "#badge-Announcement";
                     if ($(badgeElement).length == 0)
                         $("#btn-Announcements").append("<span id='badge-Announcement' class='badge'></span>");
                     $("#badge-Announcement").text(arrayAnnoucements[0]);
                     $("#allAnnouncements").append(arrayAnnoucements[1]);
                 }
                 else {
                     $("#allAnnouncements li").remove();
                     $("#badge-Announcement").remove();
                     $("#allAnnouncements").append("<li><b>No new Announcements</b></li><li class='divider'></li>");
                 }

                 var allAnchors = $('#allAnnouncements').find("a");

                 // Bind the click event with the Events Anchors
                 $.each(allAnchors, function (index, eventAnchor) {
                     $(eventAnchor).bind('click', function () {
                         var eventId = $(this).attr("data-eventId");
                         oApplication.oShowMeetEventView.loadMeetEvent(eventId, _spPageContextInfo.userId, true);
                     });
                 });
             }

             var errorAnnouncements = function () {

             }

             var myAnnouncements = function () {
                 var oAnnouncementsController = new AnnouncementsController(oApplication);

                 oAnnouncementsController.getMyAnnouncements()
                    .then(successAnnouncements, errorAnnouncements);
             }

             setInterval(myAnnouncements, 30000);   // Get the announcement of the user after 30 seconds.

             myAnnouncements();
             return {
                 getMyAnnouncments: myAnnouncements
             }
         }

         return AnnouncementView;
     });