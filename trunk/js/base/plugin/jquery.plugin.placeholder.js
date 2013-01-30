/*
 * @Name: Cross-browser placeholder
 * @Desc: placeholder solution
 */
jQuery(function($){
    if (!$.support.placeholder) {
        $('input[placeholder], textarea[placeholder]').each(function(i, el){
            el = $(el);
            var defValue = el.attr('placeholder'), defColor = el.css('color');
            el.focus(function(){
                if (this.value === '' || this.value === defValue) {
                    $(this).css('color', defColor);
                    this.value = '';
                }
            })
            .blur(blurHandler)
            .closest('form').submit(function(){
                if (el.val() === defValue) {
                    el.val('');
                }
            });
            blurHandler.call(el[0]);
            function blurHandler(){
                if (this.value === '' || this.value === defValue) {
                    $(this).css('color', '#999');
                    this.value = defValue;
                }
            }
        });
    }
});


