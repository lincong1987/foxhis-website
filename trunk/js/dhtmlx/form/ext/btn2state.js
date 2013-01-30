dhtmlXForm.prototype.items.btn2state = {
	setChecked: function(item, state) {
		item._checked = (state===true?true:false);
		item.childNodes[item._ll?1:0].lastChild.className = "dhxform_img "+item._cssName+"_"+(item._checked?"1":"0");
		this.doCheckValue(item);
	}
};

(function() {
	for (var a in dhtmlXForm.prototype.items.checkbox) {
		if (!dhtmlXForm.prototype.items.btn2state[a]) dhtmlXForm.prototype.items.btn2state[a] = dhtmlXForm.prototype.items.checkbox[a];
	}
})();


dhtmlXForm.prototype.items.btn2state.render2 = dhtmlXForm.prototype.items.btn2state.render;
dhtmlXForm.prototype.items.btn2state.render = function(item, data) {
	data._autoInputWidth = false;
	this.render2(item, data);
	item._type = "btn2state";
	item._cssName = (typeof(data.cssName)=="undefined"?"btn2state":data.cssName);
	this.setChecked(item, item._checked);
	return this;
};
