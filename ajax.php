<?php
ob_start();
$action = $_GET['action'];
include 'admin_class.php';
$crud = new Action();
if ($action == 'login') {
	$login = $crud->login();
	if ($login)
		echo $login;
}
if ($action == 'logout') {
	$logout = $crud->logout();
	if ($logout)
		echo $logout;
}
// if ($action == 'save_user') {
// 	$save = $crud->save_user();
// 	if ($save)
// 		echo $save;
// }
// if ($action == 'delete_user') {
// 	$save = $crud->delete_user();
// 	if ($save)
// 		echo $save;
// }
// if ($action == 'update_account') {
// 	$save = $crud->update_account();
// 	if ($save)
// 		echo $save;
// }
// if ($action == "save_settings") {
// 	$save = $crud->save_settings();
// 	if ($save)
// 		echo $save;
// }

if ($action == "add_package") {
	$add = $crud->add_package();
	if ($add)
		echo $add;
}
if ($action == "edit_package") {
	$edit = $crud->edit_package();
	if ($edit)
		echo $edit;
}

if ($action == "delete_package") {
	$delete = $crud->delete_package();
	if ($delete)
		echo $delete;
}
if ($action == "add_customer") {
	$add = $crud->add_customer();
	if ($add)
		echo $add;
}
if ($action == "edit_customer") {
	$edit = $crud->edit_customer();
	if ($edit)
		echo $edit;
}

if ($action == "delete_package") {
	$delete = $crud->delete_customer();
	if ($delete)
		echo $delete;
}
// if ($action == "save_trainer") {
// 	$save = $crud->save_trainer();
// 	if ($save)
// 		echo $save;
// }

// if ($action == "delete_trainer") {
// 	$delete = $crud->delete_trainer();
// 	if ($delete)
// 		echo $delete;
// }
// if ($action == "save_member") {
// 	$save = $crud->save_member();
// 	if ($save)
// 		echo $save;
// }
// if ($action == "delete_member") {
// 	$save = $crud->delete_member();
// 	if ($save)
// 		echo $save;
// }

// if ($action == "save_schedule") {
// 	$save = $crud->save_schedule();
// 	if ($save)
// 		echo $save;
// }
// if ($action == "delete_schedule") {
// 	$save = $crud->delete_schedule();
// 	if ($save)
// 		echo $save;
// }
// if ($action == "get_schecdule") {
// 	$get = $crud->get_schecdule();
// 	if ($get)
// 		echo $get;
// }

// if ($action == "save_payment") {
// 	$save = $crud->save_payment();
// 	if ($save)
// 		echo $save;
// }

// if ($action == "renew_membership") {
// 	$save = $crud->renew_membership();
// 	if ($save)
// 		echo $save;
// }

// if ($action == "end_membership") {
// 	$save = $crud->end_membership();
// 	if ($save)
// 		echo $save;
// }
// if ($action == "save_membership") {
// 	$save = $crud->save_membership();
// 	if ($save)
// 		echo $save;
// }
ob_end_flush();
