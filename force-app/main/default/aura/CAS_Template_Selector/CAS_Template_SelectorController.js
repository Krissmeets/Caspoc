(
//##################################
//
// DISCLAIMER 
// Code comes with not warranty, has not passed security review and is provided as is
// Date: November 2017
// Contact: ksmeets@salesforce.com
//
//##################################

{
	jsInit : function(cmp) {

	//	var cmpPage = cmp.find("Pagehdr");
	//	$A.util.addClass(cmpPage,"slds-modal__header");


		var aLoadTemplate = cmp.get("c.LoadTemplates")
		var sObjectName = cmp.get("v.sObjectName");

		console.log('LOG:' + sObjectName);
		
		//### Retrieve the available templates
		aLoadTemplate.setParams({"v_object":sObjectName});
		aLoadTemplate.setCallback(this, function(res) {
			var sState = res.getState(); 
			if ( sState == "SUCCESS") {
				cmp.set("v.TemplateValues",res.getReturnValue());
				var sTmp = res.getReturnValue()[0];

				cmp.find("CASTemplate").set("v.value", sTmp);
				var e1 = cmp.getEvent("SelectTemplateEvent");
    			e1.setParam("Template",sTmp);
    			e1.fire();					
			} else {
				alert("Error Loading Templates:" + sState);

			}

		})
		$A.enqueueAction(aLoadTemplate);

	},

	jsChangeTemplate : function(cmp,evt,hlp) {

		var sTmp = cmp.find("CASTemplate").get("v.value");
		var e1 = cmp.getEvent("SelectTemplateEvent");
    	e1.setParam("Template",sTmp);
    	e1.fire();		
	}

})