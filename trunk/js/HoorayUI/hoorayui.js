$.fn.HRspinner = function(options){
	var options = $.extend({}, {
		step   : 1,
		maxnum : 999,
		minnum : 0
	}, options);
	$(this).each(function(){
		var input = $(this), inputWidth = input.width() + 40, inputDiv;
		//创建容器
		input.after('<div style="width:' + inputWidth + 'px;float:left"></div>');
		//定位容器
		inputDiv = input.next('div');
		//将输入框放入容器中，并增加+-按钮
		inputDiv.append(input).append('<div class="HRspinner HRspinner-up"></div><div class="HRspinner HRspinner-down"></div>');
		//绑定事件
		inputDiv.children('.HRspinner').on('click',function(){
			//判断输入框是否禁用和只读
			if(input.attr('disabled') !== 'disabled' && input.attr('readonly') !== 'readonly'){
				if($(this).hasClass('HRspinner-up')){
					input.val(parseFloat(input.val() == '' ? 0 : input.val()) + options.step > options.maxnum ? options.maxnum : parseFloat(input.val() == '' ? 0 : input.val()) + options.step);
				}else{
					input.val(parseFloat(input.val() == '' ? 0 : input.val()) - options.step < options.minnum ? options.minnum : parseFloat(input.val() == '' ? 0 : input.val()) - options.step);
				}
			}
		});
	});
};