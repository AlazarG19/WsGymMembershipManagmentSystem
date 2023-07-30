<?php
session_start();
ini_set('display_errors', 1);
class Action
{

	private $db;

	public function __construct()
	{
		ob_start();
		include 'db_connect.php';

		$this->db = $conn;
	}
	function __destruct()
	{
		$this->db->close();
		ob_end_flush();
	}

	function login()
	{
		$username = $_POST["username"];
		$password = $_POST["password"];
		$qry = $this->db->query("SELECT * FROM users where username = '" . $username . "' and password = '" . md5($password) . "' ");
		if ($qry->num_rows > 0) {
			foreach ($qry->fetch_array() as $key => $value) {
				$_SESSION['login_' . $key] = $value;
			}
			echo 1;
		} else {
			echo 0;
		}
	}
	function logout()
	{
		session_destroy();
		foreach ($_SESSION as $key => $value) {
			unset($_SESSION[$key]);
		}
		header("location:login.php");
	}
	function add_package()
	{
		$name = $_POST["name"];
		$price = $_POST["price"];
		$save = $this->db->query("INSERT INTO packages (packagename, packageprice)
			VALUES ('$name', $price)");

		if ($save) {
			return 1;
		} else {
			return 0;
		}
	}
	function edit_package()
	{
		$id = $_POST["id"];
		$name = $_POST["name"];
		$price = $_POST["price"];
		$save = $this->db->query("UPDATE packages
		SET packagename = '$name', packageprice = $price
		WHERE id = $id;");
		if ($save) {
			return 1;
		} else {
			return 0;
		}
		// if ($save)
		// 	return 1;
	}
	function delete_package()
	{
		$id = $_POST["id"];

		$delete = $this->db->query("DELETE FROM packages where id = " . $id);
		if ($delete) {
			return 1;
		} else {
			return 0;
		}
	}
	function add_customer()
	{
		$name = $_POST["name"];
		$package = $_POST["package"];
		// Assuming $_POST["start_date"] contains the date in the format "YYYY-MM-DD"
		$start_date = $_POST["start_date"];

		// Create a DateTime object from the start date
		$start_date_obj = new DateTime($start_date);

		// Add 30 days to the start date
		$start_date_obj->modify('+31 days');

		// Format the end date as per your requirement
		$end_date = $start_date_obj->format('Y-m-d');
		$start_date = new DateTime($_POST["start_date"]);
		$start_date = $start_date->format('Y-m-d');
		$phone_number = $_POST["phone_number"];
		$query = "INSERT INTO members (name,package_id,phone_number, start_date,end_date,total_subscribed)
		VALUES ('$name',$package,$phone_number,'$start_date','$end_date',1)";

		$save = $this->db->query($query);

		if ($save) {
			return 1;
		} else {
			return 0;
		}
	}
	function edit_customer()
	{
		$id = $_POST["id"];
		$name = $_POST["name"];
		$price = $_POST["price"];
		$save = $this->db->query("UPDATE members
		SET packagename = '$name', packageprice = $price
		WHERE id = $id;");
		if ($save) {
			return 1;
		} else {
			return 0;
		}
		// if ($save)
		// 	return 1;
	}
	function delete_customer()
	{
		$id = $_POST["id"];
		$delete = $this->db->query("DELETE FROM members where id = " . $id);
		if ($delete) {
			// return "DELETE FROM 'members' where id = " . $id;
			return 1;
		} else {
			return 0;
		}
	}
	function renew_customer()
	{
		$id = $_POST["id"];
		$update = $this->db->query("UPDATE members
		SET `end_date` = DATE_ADD(CURDATE(), INTERVAL 31 DAY)
		WHERE id = " . $id);
		if ($update) {
			return 1;
		} else {
			return 0;
		}
	}
}
