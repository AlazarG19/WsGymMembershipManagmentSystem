"use strict";

// Class definition
var KTPackagesList = function () {
    // Define shared variables
    var datatable;
    var filterMonth;
    var filterPayment;
    var table

    // Private functions
    var initPackageList = function () {
        // Set date data order
        const tableRows = table.querySelectorAll('tbody tr');

        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            "info": false,
            'order': [],

        });

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        datatable.on('draw', function () {
            initToggleToolbar();
            handleDeleteRows();
            toggleToolbars();
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-package-table-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }



    // Delete package
    var handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll('[data-kt-package-table-filter="delete_row"]');

        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();
                let id = this.dataset.id
                // Select parent row
                const parent = e.target.closest('tr');

                // Get package name
                const packageName = parent.querySelectorAll('td')[0].innerText;
                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + packageName + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then(function (result) {

                    if (result.value) {
                        $.ajax({
                            url: 'ajax.php?action=delete_package',
                            method: 'POST',
                            data: { id },
                            error: err => {
                                Swal.fire({
                                    text: packageName + " was not deleted.",
                                    icon: "error",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn fw-bold btn-primary",
                                    }
                                });
                                console.log(err)
                                // $('#login-form button[type="button"]').removeAttr('disabled').html('Login');

                            },
                            success: function (resp) {
                                console.log(resp)
                                Swal.fire({
                                    text: "You have deleted " + packageName + "!.",
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn fw-bold btn-primary",
                                    }
                                }).then(function () {
                                    // Remove current row
                                    datatable.row($(parent)).remove().draw();
                                });
                                // Enable button

                            }
                        })
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: packageName + " was not deleted.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        });
                    }
                });
            })
        });
    }
    // Edit package
    var handleEditRows = () => {
        // Select all delete buttons
        const editButtons = table.querySelectorAll('[data-kt-package-table-filter="edit_row"]');

        editButtons.forEach(ed => {
            // Delete button on click
            ed.addEventListener('click', function (e) {
                e.preventDefault();
                console.log(this)
                // let id = this.dataset.id
                // Select parent row
                const parent = e.target.closest('tr');
                console.log(parent)
                // Get package name
                const packageId = parent.querySelectorAll('td')[0].dataset.id;
                const packageName = parent.querySelectorAll('td')[0].innerText;
                const packagePrice = parent.querySelectorAll('td')[1].innerText;
                document.querySelector("#editpackagename").value = packageName
                document.querySelector("#editpackageprice").value = packagePrice
                document.querySelector("#editpackageid").value = packageId
                // // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                // Swal.fire({
                //     text: "Are you sure you want to delete " + packageName + "?",
                //     icon: "warning",
                //     showCancelButton: true,
                //     buttonsStyling: false,
                //     confirmButtonText: "Yes, delete!",
                //     cancelButtonText: "No, cancel",
                //     customClass: {
                //         confirmButton: "btn fw-bold btn-danger",
                //         cancelButton: "btn fw-bold btn-active-light-primary"
                //     }
                // }).then(function (result) {

                //     if (result.value) {
                //         $.ajax({
                //             url: 'ajax.php?action=delete_package',
                //             method: 'POST',
                //             data: { id },
                //             error: err => {
                //                 Swal.fire({
                //                     text: packageName + " was not deleted.",
                //                     icon: "error",
                //                     buttonsStyling: false,
                //                     confirmButtonText: "Ok, got it!",
                //                     customClass: {
                //                         confirmButton: "btn fw-bold btn-primary",
                //                     }
                //                 });
                //                 console.log(err)
                //                 // $('#login-form button[type="button"]').removeAttr('disabled').html('Login');

                //             },
                //             success: function (resp) {
                //                 console.log(resp)
                //                 Swal.fire({
                //                     text: "You have deleted " + packageName + "!.",
                //                     icon: "success",
                //                     buttonsStyling: false,
                //                     confirmButtonText: "Ok, got it!",
                //                     customClass: {
                //                         confirmButton: "btn fw-bold btn-primary",
                //                     }
                //                 }).then(function () {
                //                     // Remove current row
                //                     datatable.row($(parent)).remove().draw();
                //                 });
                //                 // Enable button

                //             }
                //         })
                //     } else if (result.dismiss === 'cancel') {
                //         Swal.fire({
                //             text: packageName + " was not deleted.",
                //             icon: "error",
                //             buttonsStyling: false,
                //             confirmButtonText: "Ok, got it!",
                //             customClass: {
                //                 confirmButton: "btn fw-bold btn-primary",
                //             }
                //         });
                //     }
                // });
            })
        });
    }



    // Init toggle toolbar
    var initToggleToolbar = () => {
        // Toggle selected action toolbar
        // Select all checkboxes
        const checkboxes = table.querySelectorAll('[type="checkbox"]');

        // Select elements
        const deleteSelected = document.querySelector('[data-kt-package-table-select="delete_selected"]');

        // Toggle delete selected toolbar
        checkboxes.forEach(c => {
            // Checkbox on click event
            c.addEventListener('click', function () {
                setTimeout(function () {
                    toggleToolbars();
                }, 50);
            });
        });

        // Deleted selected rows
        deleteSelected.addEventListener('click', function () {
            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
            Swal.fire({
                text: "Are you sure you want to delete selected packages?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, delete!",
                cancelButtonText: "No, cancel",
                customClass: {
                    confirmButton: "btn fw-bold btn-danger",
                    cancelButton: "btn fw-bold btn-active-light-primary"
                }
            }).then(function (result) {
                if (result.value) {
                    Swal.fire({
                        text: "You have deleted all selected packages!.",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary",
                        }
                    }).then(function () {
                        // Remove all selected packages
                        checkboxes.forEach(c => {
                            if (c.checked) {
                                datatable.row($(c.closest('tbody tr'))).remove().draw();
                            }
                        });

                        // Remove header checked box
                        const headerCheckbox = table.querySelectorAll('[type="checkbox"]')[0];
                        headerCheckbox.checked = false;
                    });
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Selected packages was not deleted.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary",
                        }
                    });
                }
            });
        });
    }

    // Toggle toolbars
    const toggleToolbars = () => {
        // Define variables
        const toolbarBase = document.querySelector('[data-kt-package-table-toolbar="base"]');
        const toolbarSelected = document.querySelector('[data-kt-package-table-toolbar="selected"]');
        const selectedCount = document.querySelector('[data-kt-package-table-select="selected_count"]');

        // Select refreshed checkbox DOM elements 
        const allCheckboxes = table.querySelectorAll('tbody [type="checkbox"]');

        // Detect checkboxes state & count
        let checkedState = false;
        let count = 0;

        // Count checked boxes
        allCheckboxes.forEach(c => {
            if (c.checked) {
                checkedState = true;
                count++;
            }
        });

        // Toggle toolbars
        if (checkedState) {
            selectedCount.innerHTML = count;
            toolbarBase.classList.add('d-none');
            toolbarSelected.classList.remove('d-none');
        } else {
            toolbarBase.classList.remove('d-none');
            toolbarSelected.classList.add('d-none');
        }
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_packages_table');

            if (!table) {
                return;
            }

            initPackageList();
            initToggleToolbar();
            handleSearchDatatable();
            handleDeleteRows();
            handleEditRows();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTPackagesList.init();
});