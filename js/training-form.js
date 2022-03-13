
if ($('.jsFormModal')){
    let jsFormModal = $('.jsFormModal');
    let jsFormModalTrigger = jsFormModal.find('.jsFormModalTrigger');
    
    jsFormModalTrigger.on('click', function(){
        $(this).closest('.jsFormModal').addClass('is-form');
    })
}