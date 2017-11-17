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
	selectItem : function(cmp, evt, hlp) {
   
        var ev = cmp.getEvent("ItemSelected");
        ev.setParam("Item", cmp.get("v.Item"));  
        ev.fire();

    }
})