var handle = (function(win, doc){
	function keyListener(e){
		e = e || win['event'];
		var target = e['target'] || e['srcElement'],
			keydown = e['type'] == 'keydown',
			id = target['id'],
			tag = (target['nodeName'] || '')['toLowerCase'](),
			typeattr = target['type'],
			keycode = e['keyCode'] || e['which'],
			modifiers = (keydown? e['shiftKey'] << 2: 0) ^ e['ctrlKey'] << 1 ^ e['altKey'],
			code = keycode << 4 ^ keydown << 3 ^ modifiers,
			f;
		//ignore unmodified from text inputs: password, text inputs, textareas
		if(modifiers || !(tag == 'input' && (typeattr == 'password' || typeattr == 'text') || tag == 'textarea')){
			//check handler on specific element
			(f = elementHandlers[id]) && (f = f[code]) && (f(e), 1) ||
			//else check state handler
			(f = stateHandlers[code]) && (f(e), 1) ||
			//else check global handler
			(f = globalHandlers[code]) && f(e);
		}
	}
	function registerKey(context, keyname, fn, modifiers){
		//context = element id string or 0 (global) or 1 (page-specific)
		//modifiers: shift = 4, ctrl = 2, alt = 1
		//eg shift + alt = 5
		var keycode = specialKeys[keyname['toUpperCase']()],
		keydown = keycode || (modifiers & 3)? 1: 0,
		code,
		id =  typeof(context) == 'string'? context: 0,
		registry = context? stateHandlers: globalHandlers;
		if(id){
			registry = elementHandlers;
			registry = registry[id] || (registry[id] = {});
		}
		if(!keycode) keycode = keyname[keydown?'toUpperCase':'toLowerCase']()['charCodeAt'](0);
		code = keycode << 4 ^ keydown << 3 ^ modifiers;
		registry[code] = fn;
		return function(){//unregister
			registry[id? id: code] = null;
		}
	}
	var i, addEvent = doc['addEventListener'] || (doc['attachEvent'] && function(etype, fn){
		doc['attachEvent']('on'+ etype, fn);
	}),
	elementHandlers = {},
	stateHandlers = {},
	globalHandlers = {},
	specialKeys = {
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
	publicInterface = {
		'GLOBAL': 0,
		'STATE': 1,
		'SHIFT': 4,
		'CTRL': 2,
		'ALT': 1,
		'key': registerKey,
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
		'newState': function(){
			stateHandlers = {};
		}
	};
	for(i in specialKeys){
		publicInterface [i] = specialKeys[i];
	}
	addEvent('keydown', keyListener);
	addEvent('keypress', keyListener);
	return publicInterface;
})(window, document);
