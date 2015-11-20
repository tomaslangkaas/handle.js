var handle = (function(doc){
	function addEvent(){}
	var i, specialKeys = {
		'SPACE': 32,
		'ENTER': 13,
		'TAB': 9,
		'BACKSPACE': 8,
		'ESC': 27,
		'LEFT': 37,
		'UP': 38,
		'RIGHT': 39,
		'DOWN': 40,
		'INSERT': 45,
		'DELETE': 46,
		'HOME': 36,
		'END': 35,
		'PAGEUP': 33,
		'PAGEDOWN': 34,
		'F1': 112,
		'F2': 113,
		'F3': 114,
		'F4': 115,
		'F5': 116,
		'F6': 117,
		'F7': 118,
		'F8': 119,
		'F9': 120,
		'F10': 121,
		'F11': 122,
		'F12': 123
	},
	interface = {
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
	for(i in specialKeys){
		interface[i] = specialKeys[i];
	}
	return interface;
})(document)
