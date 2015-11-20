var handle = (function(doc){
	function addEvent(){}
	return {
		'SHIFT': 4,
		'CTRL': 2,
		'ALT': 1,
		'key': function(context, fn, key, modifiers){
			
		},
		'click': function(id, fn){
			var elm = doc['getElementById'](id) || {};
			elm['onclick'] = fn;
			elm['ontouchstart'] = function(e){
				e['preventDefault']();
				fn();
			};
			return function(){
				elm['onclick'] = elm['ontouchstart'] = null;
			}
		},
		'state': function(){}
	};
})(document)
