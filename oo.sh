Echo "Pushing and opening account new"
sfdx force:source:push
sfdx force:org:open -p /one/one.app#/sObject/Account/new
