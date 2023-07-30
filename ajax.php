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

if ($action == "renew_customer") {
	$renew = $crud->renew_customer();
	if ($renew)
		echo $renew;
}
if ($action == "delete_customer") {
	$save = $crud->delete_customer();
	if ($save)
		echo $save;
}


ob_end_flush();
