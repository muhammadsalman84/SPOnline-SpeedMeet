﻿<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.ui.dialog.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/bootstrap.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/bootstrap-theme.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/fullcalendar.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/jquery.dataTables.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/jquery.fileupload.css" />

    <!-- Add your JavaScript to the following file -->
    <script src="../Scripts/libs/jquery-1.11.3.min.js"></script>
    <script src="../Scripts/libs/moment.min.js"></script>
    <script src="../Scripts/libs/fullcalendar.min.js"></script>
    <script src="../Scripts/libs/jquery.dataTables.js"></script>

    <!--<script src="../Scripts/libs/bootstrap.min.js"></script>
    <script src="../Scripts/libs/jquery.dataTables.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
    <script src="https://www.google.com/jsapi"></script>
    <script src="../Scripts/libs/moment.min.js"></script>-->
    <!--<script src="../Scripts/libs/bootstrap.min.js"></script>-->
    <script data-main="../Scripts/App" src="../Scripts/require.js"></script>
    <!--<script src="../Scripts/libs/validator.js"></script>-->
    <!--<script src="../Scripts/BloggerCode.js"></script>-->
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    SpeedMeet App for SharePoint
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <SharePoint:ScriptLink Name="clienttemplates.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink Name="clientforms.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink Name="clientpeoplepicker.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink Name="autofill.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink Name="sp.core.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <div id="IModules">
        <div id="IHeader" class="row">
            <div class="col-md-2">
                <!--<img id="img-company-logo" src="../Images/img_TUV_Logo.jpg" alt="TÜV Rheinland logo" />-->
                <img id="img-company-logo" src="../Images/logo-contentteam.png" alt="Contentteam logo" />
            </div>
            <div class="col-md-8">
                <img id="img-app-logo" class="img-responsive" src="../Images/speedmeet_logo-text-small.png" alt="SharePoint Speed Meet App logo" />
            </div>
            <div class="col-md-2">
                <div id="IHeaderButtons">
                    <div class="btn-group">
                        <a id="btn-Announcements" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                            <i class="glyphicon glyphicon-bell"></i><span id="badge-Announcement" class="badge"></span>
                        </a>
                        <div id="allAnnouncements" class="dropdown-menu dropdown-menu-right" style="padding: 15px; padding-bottom: 0px;">
                            <!--<ul id="allAnnouncements" class="dropdown-menu dropdown-menu-right" role="menu">-->
                            <li><b>No new Announcements</b></li>
                            <li class='divider'></li>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="col-md-2">
                <div id="user-info"></div>
            </div>-->
        </div>
        <div class="row">
            <div class="col-md-12">
                <hr />
            </div>
        </div>
        <div id="IContainer" class="row">
            <div class="col-md-2">
                <div id="IMenubar">
                    <ul class="nav nav-pills nav-stacked span3">
                        <li class="active"><a id="btnNewMeetEvent" href="javascript:;" data-bsbutton="true">New SpeedMeet</a></li>
                        <li><a id="btnMyMeetEvents" href="javascript:;" data-bsbutton="true">My SpeedMeet(s)</a></li>
                        <li><a id="btnJoinMeetEvent" href="javascript:;" data-bsbutton="true">SpeedMeet Invitation(s)</a></li>
                    </ul>
                </div>
            </div>
            <div id="IContent">
                <div id="IMeetEvent" class="col-md-10 hide">
                </div>
                <div id="IMyMeetEvent" class="col-md-10 hide">
                </div>
                <div id="IJoinMeetEvent" class="col-md-10 hide">
                </div>
                <div id="IShowMeetEvent" class="col-md-10 hide">
                </div>
                <div id="IFinalMeetEvent" class="col-md-10 hide">
                </div>
                <div id="IProgress" class="col-md-10 hide">
                    <img id="imgProgress" src="../Images/Progress.gif" />
                </div>
                <div id="IProgressbar" class="progress progress-striped active module-progressbar hide">
                    <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%; height: 40px;">
                        Loading... 
                    </div>
                </div>
            </div>
        </div>


    </div>

</asp:Content>
