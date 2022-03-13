$(document).ready(function() {
	$('.jsPhoneMask').mask('+7 (999) 999-99-99', {autoclear: 0});
});


$(document).on('af_complete', function(event, response) {
	var formId = response.form.attr('id');
	if (response.success === true) {
		if (response.form.attr('id') == 'free_form') {
			$(location).attr('href', 'http://free.hitfitness.club/monpanse/kupon-monpanse/');
		}
	}
});