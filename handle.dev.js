var handle = (function(doc){
  function addEvent(){}
  
  return {
    'key': function(){},
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
