angular.module("customFilters",[])
.filter("unique",function(){
	return function(data,propertyName){
		if(angular.isArray(data)&&angular.isString(propertyName)){
			var results=[];
			var keys={};
			for(var i=0;i<data.length;i++){
				var val=data[i][propertyName];
				if(angular.isUndefined(keys[val])){
					keys[val]=true;
					results.push(val);
				}
			}
			return results;
		}else{
			return data;
		}
	}
})
.filter("range",function($filter){
	return function(data,page,size){
		if(angular.isArray(data)&&angular.isNumber(page)&&angular.isNumber(size)){
			var startindex=(page-1)*size;
			if(data.length<startindex){
				return [];
			}else{
				return $filter("limitTo")(data.splice(startindex),size);
			}
		}else{
			return data;
		}
	}
})
.filter("pageCount",function(){
	return function(data,size){
		if(angular.isArray(data)){
			var results=[];
			for(var i=0;i<Math.ceil(data.length/size);i++){
				results.push(i);
			}
			return results;
		}else{
			return data;
		}
	}
})
