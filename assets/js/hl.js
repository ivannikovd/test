$('.hidden-link').click(function() {
	window.open($(this).data('link'));
	return false;
});