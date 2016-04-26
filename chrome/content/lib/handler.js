var torpedo = torpedo || {};
var clickTimer = null, countDownTimer = null;
var tempTarget;
var Application = Components.classes["@mozilla.org/steel/application;1"].getService(Components.interfaces.steelIApplication);

torpedo.handler = torpedo.handler || {};

torpedo.handler.MouseLeavetimer;

torpedo.handler.mouseOverTooltipPane = function (event) 
{
	clearTimeout(torpedo.handler.MouseLeavetimer);
};

torpedo.handler.mouseDownTooltipPane = function (event) 
{		
	torpedo.handler.MouseLeavetimer = setTimeout(function (e) 
	{
		document.getElementById("tooltippanel").hidePopup();
		
		if(countDownTimer != null)
		{
			clearInterval(countDownTimer);
			countDownTimer = null;
		}
		
		if(clickTimer != null)
		{
			clearTimeout(clickTimer);
		}
	}, 10); 
};

torpedo.handler.mouseOverHref = function (event) 
{
	clearTimeout(torpedo.handler.MouseLeavetimer);
	var panel = document.getElementById("tooltippanel");
	tempTarget = torpedo.functions.findParentTagTarget(event,'A');
	var tempTargetc = event.target || event.srcElement;
	torpedo.handler.setCountDownTimer();


	torpedo.updateTooltip(tempTarget.href,tempTarget);

	panel.openPopup(tempTarget, "after_start", 0, 0, true, false);
	
};

var a = torpedo.prefs.getBoolPref("checkedGreenList");
var b = torpedo.prefs.getBoolPref("activatedGreenList");
var c = torpedo.prefs.getBoolPref("activatedOrangeList");

torpedo.handler.isChecked = function (color){
	if(color == "green") return torpedo.prefs.getBoolPref("checkedGreenList");
	if(color == "greenActivated") return torpedo.prefs.getBoolPref("activatedGreenList");
	if(color == "orangeActivated") return torpedo.prefs.getBoolPref("activatedOrangeList");
};

torpedo.handler.changeChecked = function (){
	a = !a;
	torpedo.prefs.setBoolPref("checkedGreenlist", a);
};

torpedo.handler.changeActivatedGreen = function (){
	b = !b;
	torpedo.prefs.setBoolPref("activatedGreenlist", b);
};

torpedo.handler.changeActivatedOrange = function (){
	c = !c;
	torpedo.prefs.setBoolPref("activatedOrangelist", c);
};

torpedo.handler.setCountDownTimer = function () {
	if(countDownTimer == null){
		countDownTimer = torpedo.functions.countdown(torpedo.prefs.getIntPref("blockingTimer"),'countdown', tempTarget.href);
		
		clickTimer = setTimeout(function()
		{
			if(clickTimer != null)
			{
				clearTimeout(clickTimer);
			}
		}, torpedo.prefs.getIntPref("blockingTimer")*1000);
	}
};

torpedo.handler.resetCountDownTimer = function (){
	if(countDownTimer != null)
		{
			clearInterval(countDownTimer);
			countDownTimer = null;
		}

		if(clickTimer != null)
		{
			clearTimeout(clickTimer);
		}
	torpedo.handler.setCountDownTimer();
};

torpedo.handler.mouseDownHref = function (event) 
{
	torpedo.handler.MouseLeavetimer = setTimeout(function (e) 
	{
		document.getElementById("tooltippanel").hidePopup();
		
		if(countDownTimer != null)
		{
			clearInterval(countDownTimer);
			countDownTimer = null;
		}
		
		if(clickTimer != null)
		{
			clearTimeout(clickTimer);
		}
	}, 10); 
};

torpedo.handler.mouseClickHref = function (event) 
{
	var url = tempTarget.href;
	if(tempTarget.getAttribute('redirection_url') != null)
	{
		url = tempTarget.getAttribute('redirection_url');
	}
	var baseDomain = torpedo.functions.getDomainWithFFSuffix(url);
	torpedo.db.pushUrl(baseDomain);

	var ioservice = Components.classes["@mozilla.org/network/io-service;1"]
                          .getService(Components.interfaces.nsIIOService);

	var uriToOpen = ioservice.newURI(url, null, null);

	var extps = Components.classes["@mozilla.org/uriloader/external-protocol-service;1"]
	                      .getService(Components.interfaces.nsIExternalProtocolService);

	// now, open it!
	extps.loadURI(uriToOpen, null);
};

torpedo.handler.mouseClickInfoButton = function (event) 
{
	torpedo.dialogmanager.createInstruction(1080,607.5);
};

torpedo.handler.mouseClickDeleteButton = function(event){
	torpedo.dialogmanager.createDelete(440,117);
};

torpedo.handler.mouseClickEditButton = function(event){
	torpedo.dialogmanager.createEdit();
};

torpedo.handler.mouseClickDefaultsButton = function (event) {
	torpedo.dialogmanager.showDefaults();
};