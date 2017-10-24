({  
  
	jsInit : function (cmp,evt,hlp) {


//		var cmpPage1 = cmp.find("Pagedtl");
//		$A.util.addClass(cmpPage1,"slds-modal__header");
//		$A.util.addClass(cmpPage1,"slds-modal__content");

//		var cmpPage = cmp.find("Pagehdr");
//		$A.util.addClass(cmpPage,"slds-modal__container");



		var sObjectName = cmp.get("v.sObjectName");
	
		cmp.find("forceRecordObject").getNewRecord(
	    	sObjectName,
	    	null,
	    	false,
	    	$A.getCallback(
	    		function() {
		    		var rec = cmp.get("v.objectrecord");
		    		var recerr = cmp.get("v.objecterror");
					if (recerr || (rec == null)) {
						hlp.jsAddMessage(cmp,"INIT:" + recerr);
					}
	   			}
    	)

    );

	},


    jsNavigateHome : function(cmp, evt, hlp) {
		var sObjectName = cmp.get("v.sObjectName");

		var e1 = $A.get("e.force:navigateToObjectHome");
    	e1.setParams({"scope":sObjectName});
    	e1.fire();

    },
    
    jsLoadTemplateDetail : function(cmp, evt,hlp) {
    

		var aLoadTemplateDetail = cmp.get("c.LoadTemplateDetail")
		var sObjectName = cmp.get("v.sObjectName");
		var sTemplate = evt.getParam("Template");

		console.log('LOG:' + sObjectName);
		
		//### Retrieve the available templates
		aLoadTemplateDetail.setParams({"v_object":sObjectName, "v_template":sTemplate});
		aLoadTemplateDetail.setCallback(this, function(res) {
			var sState = res.getState(); 
			if ( sState == "SUCCESS") {
				var tmp = res.getReturnValue();
				console.log (tmp);
				hlp.jsBuildPage(cmp, tmp);

			} else {
				alert("Error Loading Template Detail:" + sState);

			}

		})
		$A.enqueueAction(aLoadTemplateDetail);

    },

    jsCreate : function (cmp,evt,hlp) {
    	var rec = cmp.get("v.objectfields");
 					
    	var allvalid = cmp.get("v.temp").reduce(
    		function (val, icmp) {
    			if (icmp.isInstanceOf("lightning:input")) {
    				
    				switch(icmp.get("v.type")) {
    					case "text":
    						rec[icmp.get("v.name")] = icmp.get("v.value");
    						break;
    					case "checkbox":
    						rec[icmp.get("v.name")] = true; //icmp.get("v.checked");
    						break;
    				}
    				icmp.showHelpMessageIfInvalid();
 					return val && icmp.get('v.validity').valid;
 				}
 				else return val && true;
    		}, true);
    	cmp.set("v.objectfields",rec);

    	if (allvalid) {
//    		console.log(cmp.get("v.objectfields"));

			cmp.find("forceRecordObject").saveRecord(function(res) {

					if (res.state == "SUCCESS" || res.state == "DRAFT") {
						var tmsg = $A.get("e.force:showToast");
						tmsg.setParams({"title": "Create Record", "message": "New Record Created", "duration" : "500", "type" : "success"});
						tmsg.fire();

					} else {
						hlp.jsAddMessage(cmp,"Error saving record:" + JSON.stringify(res.error));
					}

				}
			)


    	} else {
			var tmsg = $A.get("e.force:showToast");
			tmsg.setParams({"title": "Create Record", "message": "Please review input", "duration" : "500", "type" : "warning"});
			tmsg.fire();
    	}   	

    }
    

})
