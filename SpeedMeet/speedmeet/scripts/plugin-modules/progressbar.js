'use strict';

define(function () {
    function ProgressbarModule() {
        var iIncrementValue = 0
        var self = this;

        this.incrementProgressBar = function (iValue, sTextValue) {
            var sText = sTextValue;
            if (iIncrementValue <= 100) {

                iIncrementValue += iValue;

                $('.progress-bar').text(sText);
                $('.progress-bar').css('width', iIncrementValue + '%').attr('aria-valuenow', iIncrementValue);

                
            }
        }

        this.stopProgressBar = function () {
            $(ProgressbarModule.progressbarModuleId).addClass("hide");
            iIncrementValue = 0;
        }

        this.startProgressbar = function (sTextValue) {
            var sText = "Loading...";
            iIncrementValue = 0;
            self.incrementProgressBar(10, sText);
            //$('.progress-bar').text(sText);
        }

        this.stopProgressBarOnError = function (iValue, errorMessage, callBackFunction) {
            self.incrementProgressBar(iValue, "An error occured:" + errorMessage);
            window.setTimeout(function () {
                self.stopProgressBar();
                callBackFunction();
            }, 4000);
        }

    }

    ProgressbarModule.progressbarModuleId;

    return ProgressbarModule;
});