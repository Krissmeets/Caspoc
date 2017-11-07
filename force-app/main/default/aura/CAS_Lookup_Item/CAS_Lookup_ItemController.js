({
	selectItem : function(cmp, evt, hlp) {
   
        var ev = cmp.getEvent("ItemSelected");
        ev.setParam("Item", cmp.get("v.Item"));  
        ev.fire();

    }
})