/*
// ==UserScript==
// @author			Marcel Jodorf (ToBeDone)
// @name           	TrackableLogsVisibilityButton
// @description     This scripts will add a Button at the top of the logs section of the reviewPage. This button can change the visibility of trackable Log entrys. 
// @version        	1.131
// @grant       	GM_getValue
// @grant       	GM_setValue
// @downloadURL   	https://ssl.webpack.de/eulili.de/greasemonkey/TrackableLogsVisibilityButton/TrackableLogsVisibilityButton.user.js
// @updateURL		http://www.eulili.de/greasemonkey/TrackableLogsVisibilityButton/TrackableLogsVisibilityButton.user.js
// @include        	http://*.geocaching.com/admin/review.aspx*
// @icon			http://www.eulili.de/greasemonkey/icons/eichhoernchen.png
// @require     	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

Changelog
===================
* v1.00		2013-11-01 TBD	Startversion
* v1.10		2013-11-18 TBD	GM_setValue and GM_getValue added to save last state of visibility.
* v1.11		2013-11-18 EU	Versionscheck Autoupdate
* v1.12 	2013-11-19 EU	Änderung des Pfades in Scriptverzeichnis
* v1.13 	2013-11-26 EU	Pfadänderung Updatesystem (Wegfall "meta")


*/

var CoinLogCount = 0;

$(document).ready(function() 
{
	var zNode       = document.createElement ('div');
	var Preset		= GM_getValue('TrackableLogsVisibilityButton_LastActiveState' );
	zNode.innerHTML = '<button id="CoinLogButton" type="button">Button Text</button>';
	zNode.setAttribute ('id', 'ShowHideCoinLogs');
	Log = document.getElementById('ctl00_ContentBody_CacheLogs_dlLogHistory_ctl01_Img1').parentNode.parentNode.parentNode.parentNode.parentNode;
	Log.parentNode.insertBefore(zNode, Log);
	if (Preset == "Einblenden")
	{	ButtonShowAction();		}
	else
	{	ButtonHideAction();		}
	
});

function ButtonShowAction () 
{
	CoinLogCount = 0;
	$('img[src $="75.png"],[src $="14.png"],[src $="13.png"]').each(function( index ) 
	{
		$(this).parent().parent().next().show();
		$(this).parent().parent().show();
		CoinLogCount++;
	});
	document.getElementById ("ShowHideCoinLogs").removeEventListener ("click", ButtonShowAction, false);
	document.getElementById ("ShowHideCoinLogs").addEventListener ("click", ButtonHideAction, false);
	var BtnNode       = document.getElementById ('CoinLogButton');
	BtnNode.innerHTML = CoinLogCount+' Coinlogs ausblenden';
	GM_setValue('TrackableLogsVisibilityButton_LastActiveState','Einblenden' );
}

function ButtonHideAction () 
{
	CoinLogCount = 0;
	$('img[src $="75.png"],[src $="14.png"],[src $="13.png"]').each(function( index ) 
	{
		$(this).parent().parent().next().hide();
		$(this).parent().parent().hide();
		CoinLogCount++;
	});
	document.getElementById ("ShowHideCoinLogs").removeEventListener("click", ButtonHideAction, false);
	document.getElementById ("ShowHideCoinLogs").addEventListener ("click", ButtonShowAction, false);
	var BtnNode       = document.getElementById ('CoinLogButton');
	BtnNode.innerHTML = CoinLogCount+' Coinlogs einblenden';
	GM_setValue('TrackableLogsVisibilityButton_LastActiveState','Ausblenden' );
}


