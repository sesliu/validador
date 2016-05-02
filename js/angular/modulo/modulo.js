var app = angular.module('app',['ngDialog'
									


]);

app.config(function(ngDialogProvider){
	
	
	ngDialogProvider.setDefaults({
		
		showClose : true,
		closeByDocument: false,
		closeByEscape: false
		
	});
	
	
});
