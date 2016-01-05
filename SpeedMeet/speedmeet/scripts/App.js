'use strict';

/*require.config({
    baseUrl: '../Scripts',
    paths: {
        "jquery": "libs/jquery-1.11.3.min",
        "bootstrap": "libs/bootstrap.min",
        "datatables": "libs/jquery.dataTables",
        "async": "libs/async",
        "jsapi": "//google.com/jsapi",
        "moment": "libs/moment.min",
        "fullCalendar": "libs/fullcalendar.min",
        "jquery.validate": "libs/jquery.validate"
    },
    shim: {
        "bootstrap": { deps: ['jquery'], exports: 'Bootstrap' }
    }    
});*/

require.config({
    baseUrl: '../Scripts',
    paths: {
        "jquery": "libs/jquery-1.11.3.min",
        "bootstrap": "libs/bootstrap.min",
        "datatables": "libs/jquery.dataTables",
        "async": "libs/async",
        "jsapi": "//google.com/jsapi",
        "moment": "libs/moment.min",
        "fullCalendar": "libs/fullcalendar.min",
        "jquery.validate": "libs/jquery.validate"
    },
    shim: {
        "bootstrap": { deps: ['jquery'], exports: 'Bootstrap' }
    }
});

require(['jquery', 'starters/application', 'views/main', 'jquery.validate', 'bootstrap', 'fullCalendar'],
function ($, Application, viewMain, validate) {
    var waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose('Loading SpeedMeet...', 'Please wait, this will not take longer...');
    $(document).ready(function () {
        //(SP.Res.dialogLoading15);
        $("#IMeetEvent").load("SubPages/MeetEvent.html", function () {
            var oApplication = new Application();
            $(oApplication.modules.myMeetEventModule.id).load("SubPages/MyMeetEvent.html", function () {
                $(oApplication.modules.joinMeetEventModule.id).load("SubPages/JoinMeetEvent.html", function () {
                    $(oApplication.modules.showMeetEventModule.id).load("SubPages/ShowMeetEvent.html", function () {
                        $(oApplication.modules.finalMeetEventModule.id).load("SubPages/FinalMeetEvent.html", function () {

                            var oviewMain = new viewMain(oApplication);
                            waitDialog.close();
                            waitDialog = null;
                           
                            //getUserPicture();
                        });
                    });
                });
            });

        });

    });   
});



