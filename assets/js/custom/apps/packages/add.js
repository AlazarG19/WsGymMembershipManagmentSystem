"use strict";

// Class definition
var KTModalPackagesAdd = function () {
	var submitButton;
	var cancelButton;
	var closeButton;
	var editSubmitButton;
	var editCancelButton;
	var editCloseButton;
	var validator;
	var editvalidator;
	var editform;
	var form;
	var modal;
	var editmodal;

	// Init form inputs
	var handleForm = function () {
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		validator = FormValidation.formValidation(
			form,
			{
				fields: {
					'packagename': {
						validators: {
							notEmpty: {
								message: 'Package name is required'
							}
						}
					},
					'packageprice': {
						validators: {
							notEmpty: {
								message: 'Package Price is required'
							},
							regexp: {
								regexp: /^[0-9]+$/,
								message: 'The Package Price can only consist of number'
							}
						}
					},
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
						console.log(form.querySelector("#packagename").value)
						$.ajax({
							url: 'ajax.php?action=add_package',
							method: 'POST',
							data: { name: form.querySelector("#packagename").value, price: form.querySelector("#packageprice").value },
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
										text: "You have successfully Added Package!",
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

											var redirectUrl = "./add_packages.php";
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
						// setTimeout(function () {
						// 	submitButton.removeAttribute('data-kt-indicator');

						// 	Swal.fire({
						// 		text: "Form has been successfully submitted!",
						// 		icon: "success",
						// 		buttonsStyling: false,
						// 		confirmButtonText: "Ok, got it!",
						// 		customClass: {
						// 			confirmButton: "btn btn-primary"
						// 		}
						// 	}).then(function (result) {
						// 		if (result.isConfirmed) {
						// 			// Hide modal
						// 			modal.hide();

						// 			// Enable submit button after loading
						// 			submitButton.disabled = false;

						// 			// Redirect to packages list page
						// 			window.location = form.getAttribute("data-kt-redirect");
						// 		}
						// 	});
						// }, 2000);
					} else {
						Swal.fire({
							text: "Sorry, Fill The Required Information, please try again.",
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
			console.log("clicked close add")
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
	// Init form inputs
	var handleEditForm = function () {
		console.log("handle edit form")
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		editvalidator = FormValidation.formValidation(
			form,
			{
				fields: {
					'editpackagename': {
						validators: {
							notEmpty: {
								message: 'Package name is required'
							}
						}
					},
					'editpackageprice': {
						validators: {
							notEmpty: {
								message: 'Package Price is required'
							},
							regexp: {
								regexp: /^[0-9]+$/,
								message: 'The Package Price can only consist of number'
							}
						}
					},
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

		// Action buttons
		editSubmitButton.addEventListener('click', function (e) {
			e.preventDefault();

			// Validate form before submit
			if (editvalidator) {
				editvalidator.validate().then(function (status) {

					if (status == 'Valid') {
						editSubmitButton.setAttribute('data-kt-indicator', 'on');

						// Disable submit button whilst loading
						editSubmitButton.disabled = true;
						$.ajax({
							url: 'ajax.php?action=edit_package',
							method: 'POST',
							data: { name: editform.querySelector("#editpackagename").value, price: editform.querySelector("#editpackageprice").value, id: editform.querySelector("#editpackageid").value },
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
								console.log("resp")
								console.log(resp)
								console.log(resp == "1")
								if (resp == 1) {
									Swal.fire({
										text: "You have successfully Added Package!",
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

											var redirectUrl = "./add_packages.php";
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
						// setTimeout(function () {
						// 	submitButton.removeAttribute('data-kt-indicator');

						// 	Swal.fire({
						// 		text: "Form has been successfully submitted!",
						// 		icon: "success",
						// 		buttonsStyling: false,
						// 		confirmButtonText: "Ok, got it!",
						// 		customClass: {
						// 			confirmButton: "btn btn-primary"
						// 		}
						// 	}).then(function (result) {
						// 		if (result.isConfirmed) {
						// 			// Hide modal
						// 			modal.hide();

						// 			// Enable submit button after loading
						// 			submitButton.disabled = false;

						// 			// Redirect to packages list page
						// 			window.location = form.getAttribute("data-kt-redirect");
						// 		}
						// 	});
						// }, 2000);
					} else {
						Swal.fire({
							text: "Sorry, Fill The Required Information, please try again.",
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

		editCancelButton.addEventListener('click', function (e) {
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
					editform.reset(); // Reset form	
					editmodal.hide(); // Hide modal				
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

		editCloseButton.addEventListener('click', function (e) {
			console.log("clicked close add")
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
					editform.reset(); // Reset form	
					editmodal.hide(); // Hide modal				
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
			console.log("start")
			console.log(document.querySelector('#kt_modal_add_package'));
			console.log(document.querySelector('#kt_modal_edit_package'));
			modal = new bootstrap.Modal(document.querySelector('#kt_modal_add_package'));
			editmodal = new bootstrap.Modal(document.querySelector('#kt_modal_edit_package'));
			form = document.querySelector('#kt_modal_add_package_form');
			submitButton = form.querySelector('#kt_modal_add_package_submit');
			cancelButton = form.querySelector('#kt_modal_add_package_cancel');
			closeButton = form.querySelector('#kt_modal_add_package_close');
			editform = document.querySelector('#kt_modal_edit_package_form');
			editSubmitButton = editform.querySelector('#kt_modal_edit_package_submit');
			editCancelButton = editform.querySelector('#kt_modal_edit_package_cancel');
			editCloseButton = editform.querySelector('#kt_modal_edit_package_close');
			console.log(editform)
			handleForm();
			handleEditForm();
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
	KTModalPackagesAdd.init();
});