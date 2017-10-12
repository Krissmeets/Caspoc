public with sharing class CAS_PageController {
    
    public class clTemplate {
    	string Page_name;
    	string Page_columns;
    }

	@AuraEnabled
    public static List<clTemplate> LoadTemplateDetail(string v_template) {
    	List<clTemplate> ret = new list<clTemplate>();

    	clTemplate tmp = new clTemplate();
    	tmp.Page_name = 'Temp Page Name';
    	tmp.Page_columns = '1';

    	ret.add(tmp);

    	return ret;

    }


	@AuraEnabled
    public static List<string> LoadTemplates(string v_object) {
    	List<string> ret = new list<string>();

    	for (sobject fso : [select Name,Page_columns__c 
    						from CAS_Page_Template__c 
    						where Object__c = :v_object
    						order by Sequence__c]) {
    		ret.add((string) fso.get('Name'));

    	}
    	if (ret.size() == 0) ret.add('NO TEMPLATES');
    	return ret;
    }


}
