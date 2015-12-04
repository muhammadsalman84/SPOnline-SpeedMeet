var getQueryStringParameters = function (qsPara) {
    var paramArray = document.URL.split("?")[1].split("&");

    for (var i = 0; i < paramArray.length; i++) {
        var paraName = paramArray[i].split("=");
        if (paraName[0] === qsPara) {
            return paraName[1];
        }
    }
}

var getSPAppWebUrl = function () {
    var spAppWebUrl;

    spAppWebUrl = decodeURIComponent(getQueryStringParameters("SPAppWebUrl"));
    //  Remove the hash at the end of the url
    var hashIndex = spAppWebUrl.indexOf("#");
    if (hashIndex > -1) {
        if (hashIndex == spAppWebUrl.length - 1)
            spAppWebUrl = spAppWebUrl.substring(0, spAppWebUrl.length - 1);
    }

    return spAppWebUrl;
}

var getSPHostWebUrl = function () {
        return decodeURIComponent(getQueryStringParameters("SPHostUrl"));
}

var getUserPicture = function () {
    var oDeferred = $.Deferred();
    var loginName = "i:0#.f|membership|" + _spPageContextInfo.userLoginName;
    var oHttpRequest = {
        url: "{0}/_api/SP.UserProfiles.PeopleManager/",
        type: "GET",
        contentType: "application/json; odata=verbose",
        headers: { "accept": "application/json; odata=verbose" }
    }

    // Format Url by adding SpAppWebUrl
    oHttpRequest.url = String.format(oHttpRequest.url, getSPAppWebUrl());
    oHttpRequest.url += "GetPropertiesFor(accountName=@v)?@v='" + encodeURIComponent(loginName) + "'";
    // Get the Picture of the loggedin User 
    pictureUrl = getSPHostWebUrl() + "/_layouts/15/userphoto.aspx?size=M&accountname=" + _spPageContextInfo.userLoginName;

    try {
        $.when($.ajax(oHttpRequest))
            .done(function (data, status, jqXHR) {
                var oUserProperties = data.d;
                getPresence(oUserProperties, pictureUrl, function (pictureHtml) {
                    $("#user-info").html(pictureHtml);
                });
                oDeferred.resolve();
              })
            .fail(function (jqXHR, status, err) {
                oDeferred.reject();
             });
    }
    catch (err) {
        err.message;
    }

    return oDeferred.promise();
}


this.getPresence = function (oUser, pictureUrl, callBackSetPicture) {
    RegisterSod("Strings.js", "/_layouts/15/Strings.js");
    var options;
    if (this.presenceSettings)
        options = this.presenceSettings;
    else
        options = { type: "withpicture", redirectToProfile: true }


    var settings = $.extend({
        type: "default",
        redirectToProfile: true
    }, options);

    var name, sip, personalUrl, title, department = "" | "";
    personalUrl = "#";

    name = oUser.DisplayName;
    if (oUser.Title)
        title = oUser.Title;
    else
        title = "";

    try {
        sip = $.grep(oUser.UserProfileProperties.results, function (e) { return e.Key == "SPS-SipAddress"; })[0].Value;
    }
    catch (e) {
        sip = oUser.Email;
    }
    if (settings.redirectToProfile) {
        personalUrl = oUser.PersonalUrl;
    }
    if (settings.type == "withpicture") {
        try {
            department = $.grep(oUser.UserProfileProperties.results, function (e) { return e.Key == "Department"; })[0].Value;
        }
        catch (e) {
            department = '';
        }
    }

    var uniqueID = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    var html = '';
    if (settings.type == "default") {
        html = "<span class='ms-imnSpan'><a onmouseover='IMNShowOOUI();' onmouseout='IMNHideOOUI()' target='_blank' href='" + personalUrl + "' class='ms-imnlink ms-spimn-presenceLink' ><span class='ms-spimn-presenceWrapper ms-imnImg ms-spimn-imgSize-10x10'><img name='imnmark' title='' ShowOfflinePawn='1' class='ms-spimn-img ms-spimn-presence-offline-10x10x32' src='/_layouts/15/images/spimn.png?rev=23' alt='User Presence' sip='" + sip + "' id='imn_" + uniqueID + ",type=sip' /></span>" + name + "</a></span>"
    }
    else if (settings.type == "withpicturesmall") {
        pictureUrl += "&size=S";
        html = "<span class='ms-imnSpan ms-tableCell'><a onmouseover='IMNShowOOUI();' onmouseout='IMNHideOOUI()' style='padding: 0px;'><div class='ms-tableCell'><span class='ms-imnlink ms-spimn-presenceLink'><span class='ms-spimn-presenceWrapper ms-spimn-imgSize-5x36'><img name='imnmark' title='' showofflinepawn='1' class='ms-spimn-img ms-spimn-presence-offline-5x36x32' src='/_layouts/15/images/spimn.png' sip='" + sip + "' id='imn_" + uniqueID + ",type=sip' /></span></span></div><div class='ms-tableCell ms-verticalAlignTop'><div class='ms-peopleux-userImgDiv'><span><img title='' showofflinepawn='1' class='ms-hide' src='/_layouts/15/images/spimn.png' alt='Offline' sip='" + sip + "' /><span class='ms-peopleux-imgUserLink'><span class='ms-peopleux-userImgWrapper' style='width: 36px; height: 36px;'><img class='userIMG' style='width: 36px; height: 36px; clip: rect(0px, 36px, 36px, 0px);' src='" + pictureUrl + "' alt='" + name + "' /></span></span></span></div></div></a></span><div class='ms-tableCell ms-verticalAlignTop' style='padding-left: 10px;'><span><a href='" + personalUrl + "'>" + name + "</a></span><span style='font-size: 0.9em; display: block;'>" + title + "</span></div>";
    }
    else if (settings.type == "withpicture") {
        html = "<span class='ms-imnSpan ms-tableCell'><a href='#' target='_blank' onmouseover='IMNShowOOUI();' onmouseout='IMNHideOOUI()' style='padding: 0px;'><div class='ms-tableCell'><span class='ms-imnlink ms-spimn-presenceLink'><span class='ms-spimn-presenceWrapper ms-spimn-imgSize-8x72'><img name='imnmark' title='' showofflinepawn='1' class='ms-spimn-img ms-spimn-presence-offline-8x72x32' src='/_layouts/15/images/spimn.png' sip='" + sip + "' id='imn_" + uniqueID + ",type=sip' /></span></span></div><div class='ms-tableCell ms-verticalAlignTop'><div class='ms-peopleux-userImgDiv'><span><img title='' showofflinepawn='1' class='ms-hide' src='/_layouts/15/images/spimn.png' alt='Offline' sip='" + sip + "' /><span class='ms-peopleux-imgUserLink'><span class='ms-peopleux-userImgWrapper' style='width: 72px; height: 72px;'><img class='userIMG' style='width: 72px; height: 72px; clip: rect(0px, 72px, 72px, 0px);' src='" + pictureUrl + "' alt='" + name + "' /></span></span></span></div></div></a></span><div class='ms-tableCell ms-verticalAlignTop' style='padding-left: 10px;'><span><a target='_blank' href='" + personalUrl + "'>" + name + "</a></span><span style='font-size: 0.9em; display: block;'>" + title + "</span><span style='font-size: 0.9em; display: block;'>" + department + "</span></div>";
    }
    else if (settings.type == "pictureonlysmall") {
        pictureUrl += "&size=S";
        html = "<span class='ms-imnSpan ms-tableCell'><a onmouseover='IMNShowOOUI();' onmouseout='IMNHideOOUI()' style='padding: 0px;'><div class='ms-tableCell'><span class='ms-imnlink ms-spimn-presenceLink'><span class='ms-spimn-presenceWrapper ms-spimn-imgSize-5x36'><img name='imnmark' title='' showofflinepawn='1' class='ms-spimn-img ms-spimn-presence-offline-5x36x32' src='/_layouts/15/images/spimn.png' sip='" + sip + "' id='imn_" + uniqueID + ",type=sip' /></span></span></div><div class='ms-tableCell ms-verticalAlignTop'><div class='ms-peopleux-userImgDiv'><span><img title='' showofflinepawn='1' class='ms-hide' src='/_layouts/15/images/spimn.png' alt='Offline' sip='" + sip + "' /><span class='ms-peopleux-imgUserLink'><span class='ms-peopleux-userImgWrapper' style='width: 36px; height: 36px;'><img class='userIMG' style='width: 36px; height: 36px; clip: rect(0px, 36px, 36px, 0px);' src='" + pictureUrl + "' alt='" + name + "' /></span></span></span></div></div></a></span>";
    }
    else if (settings.type == "pictureonly") {
        html = "<span class='ms-imnSpan ms-tableCell'><a onmouseover='IMNShowOOUI();' onmouseout='IMNHideOOUI()' style='padding: 0px;'><div class='ms-tableCell'><span class='ms-imnlink ms-spimn-presenceLink'><span class='ms-spimn-presenceWrapper ms-spimn-imgSize-8x72'><img name='imnmark' title='' showofflinepawn='1' class='ms-spimn-img ms-spimn-presence-offline-8x72x32' src='/_layouts/15/images/spimn.png' sip='" + sip + "' id='imn_" + uniqueID + ",type=sip' /></span></span></div><div class='ms-tableCell ms-verticalAlignTop'><div class='ms-peopleux-userImgDiv'><span><img title='' showofflinepawn='1' class='ms-hide' src='/_layouts/15/images/spimn.png' alt='Offline' sip='" + sip + "' /><span class='ms-peopleux-imgUserLink'><span class='ms-peopleux-userImgWrapper' style='width: 72px; height: 72px;'><img class='userIMG' style='width: 72px; height: 72px; clip: rect(0px, 72px, 72px, 0px);' src='" + pictureUrl + "' alt='" + name + "' /></span></span></span></div></div></a></span>";
    }
    else if (settings.type == "presenceonly") {
        html = "<span class='ms-imnSpan'><a onmouseover='IMNShowOOUI();' onmouseout='IMNHideOOUI()'  href='" + personalUrl + "' class='ms-imnlink ms-spimn-presenceLink' ><span class='ms-spimn-presenceWrapper ms-imnImg ms-spimn-imgSize-10x10'><img name='imnmark' title='' ShowOfflinePawn='1' class='ms-spimn-img ms-spimn-presence-offline-10x10x32' src='/_layouts/15/images/spimn.png?rev=23' alt='User Presence' sip='" + sip + "' id='imn_" + uniqueID + ",type=sip' /></span></a></span>"
    }

    callBackSetPicture(html);
};