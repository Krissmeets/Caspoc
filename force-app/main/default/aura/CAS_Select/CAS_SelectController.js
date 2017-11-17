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
    jsInit : function(cmp, evt, hlp) {

    	var cmp1 = cmp.find("selectMain");
    	$A.util.addClass(cmp1, cmp.get("v.selectClass"));    

    }
})
