/*!
 *
 */
$(function(){
	$('.text, .textarea').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
	$('.text, .textarea').focusin(function(){
		$(this).addClass('focus');
	}).focusout(function(){
		$(this).removeClass('focus');
	});
});