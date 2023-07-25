"use strict";

// Class definition
var KTModalCustomersAdd = function () {
	var submitButton;
	var cancelButton;
	var closeButton;
	var validator;
	var form;
	var modal;

	// Init form inputs
	var handleForm = function () {
		console.log("validating")
		console.log(form)
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		validator = FormValidation.formValidation(
			form,
			{
				fields: {
					'customer_name': {
						validators: {
							notEmpty: {
								message: 'Customer name is required'
							}
						}
					},
					'package': {
						validators: {
							notEmpty: {
								message: 'Package is required'
							}
						}
					},
					'start_date': {
						validators: {
							notEmpty: {
								message: 'Start Date is required'
							}
						}
					},
					'phone_number': {
						validators: {
							notEmpty: {
								message: 'Phone Number is required'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
						eleInvalidClass: '',
						eleValidClass: ''
					})
				}
			}
		);

		// Revalidate country field. For more info, plase visit the official plugin site: https://select2.org/
		$(form.querySelector('[name="package"]')).on('change', function () {
			// Revalidate the field when an option is chosen
			validator.revalidateField('package');
		});

		// Action buttons
		submitButton.addEventListener('click', function (e) {
			e.preventDefault();

			// Validate form before submit
			if (validator) {
				validator.validate().then(function (status) {
					console.log('validated!');
					if (status == 'Valid') {
						submitButton.setAttribute('data-kt-indicator', 'on');

						// Disable submit button whilst loading
						submitButton.disabled = true;
						$.ajax({
							url: 'ajax.php?action=add_customer',
							method: 'POST',
							data: {
								name: form.querySelector("input[name='customer_name']").value,
								package: form.querySelector("select[name='package']").value,
								start_date: form.querySelector("input[name='start_date']").value,
								phone_number: form.querySelector("input[name='phone_number']").value
							},
							error: err => {
								submitButton.removeAttribute('data-kt-indicator');

								// Enable button
								submitButton.disabled = false;
								console.log(err)
								// $('#login-form button[type="button"]').removeAttr('disabled').html('Login');

							},
							success: function (resp) {
								submitButton.removeAttribute('data-kt-indicator');

								// Enable button
								submitButton.disabled = false;
								console.log(resp)
								console.log(resp == "1")
								if (resp == 1) {
									Swal.fire({
										text: "You have successfully Added " + form.querySelector("input[name='customer_name']").value + " !",
										icon: "success",
										buttonsStyling: false,
										confirmButtonText: "Ok, got it!",
										customClass: {
											confirmButton: "btn btn-primary"
										},
										allowOutsideClick: false
										,
									}).then(function (result) {
										if (result.isConfirmed) {

											var redirectUrl = "./add_member.php";
											console.log(redirectUrl);
											if (redirectUrl) {
												location.href = redirectUrl;
											}
										}
									});
								} else {
									Swal.fire({
										text: "Sorry, Something Went Wrong Please Try Again.",
										icon: "error",
										buttonsStyling: false,
										confirmButtonText: "Ok, got it!",
										customClass: {
											confirmButton: "btn btn-primary"
										}
									});
								}
							}
						})

					} else {
						Swal.fire({
							text: "Sorry, looks like there are some errors detected, please try again.",
							icon: "error",
							buttonsStyling: false,
							confirmButtonText: "Ok, got it!",
							customClass: {
								confirmButton: "btn btn-primary"
							}
						});
					}
				});
			}
		});

		cancelButton.addEventListener('click', function (e) {
			e.preventDefault();

			Swal.fire({
				text: "Are you sure you would like to cancel?",
				icon: "warning",
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: "Yes, cancel it!",
				cancelButtonText: "No, return",
				customClass: {
					confirmButton: "btn btn-primary",
					cancelButton: "btn btn-active-light"
				}
			}).then(function (result) {
				if (result.value) {
					form.reset(); // Reset form	
					modal.hide(); // Hide modal				
				} else if (result.dismiss === 'cancel') {
					Swal.fire({
						text: "Your form has not been cancelled!.",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-primary",
						}
					});
				}
			});
		});

		closeButton.addEventListener('click', function (e) {
			e.preventDefault();

			Swal.fire({
				text: "Are you sure you would like to cancel?",
				icon: "warning",
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: "Yes, cancel it!",
				cancelButtonText: "No, return",
				customClass: {
					confirmButton: "btn btn-primary",
					cancelButton: "btn btn-active-light"
				}
			}).then(function (result) {
				if (result.value) {
					form.reset(); // Reset form	
					modal.hide(); // Hide modal				
				} else if (result.dismiss === 'cancel') {
					Swal.fire({
						text: "Your form has not been cancelled!.",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-primary",
						}
					});
				}
			});
		})
	}

	return {
		// Public functions
		init: function () {
			// Elements
			modal = new bootstrap.Modal(document.querySelector('#kt_modal_add_customer'));

			form = document.querySelector('#kt_modal_add_customer_form');
			submitButton = form.querySelector('#kt_modal_add_customer_submit');
			cancelButton = form.querySelector('#kt_modal_add_customer_cancel');
			closeButton = form.querySelector('#kt_modal_add_customer_close');
			console.log(form)
			handleForm();
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
	KTModalCustomersAdd.init();
});