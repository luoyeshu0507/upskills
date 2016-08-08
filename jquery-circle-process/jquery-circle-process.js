/*
* author:luoyeshu
* version:1.0.0
* date:2016-01-26
*/
$.fn.jqprocess=function(options){
	var defaultoptions={
		barbgcolor:'#999',
		barcolor:'#f00',
		barwidth:'4'
	}
	var settings = $.extend(defaultoptions, options);
	return this.each(function(){
		// $(this).css('border','2px solid red');
	});
}