<!--<?php 
	if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['cause'])) {
		$conn = new mysqli('localhost', 'root', '', 'esol');
		if ($conn->connect_error) {
			echo 'Connection Failed : ' . $conn->connect_error;
		} else {
			$cause = $_GET['cause'];

			$query = "SELECT * FROM donation WHERE cause = '$cause' ORDER BY name ASC";
			$result = $conn->query($query);
			
			if ($conn->errno) {
				echo $conn->error;
				exit();
			}

			$donations = [];

			while ($donation = $result->fetch_assoc()) {
				$image = "data:image/jpeg;base64," . base64_encode($donation['image']);
				$donation['image'] = $image;
				$donations[] = $donation;
			}

			$conn->close();

			echo json_encode($donations);
			exit();
		}
	}

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$name = $_POST['name'];
		$cause = $_POST['cause'];
		$image = addslashes(file_get_contents($_FILES['image']['tmp_name']));
		$amount = $_POST['amount'];
		$payment = $_POST['payment'];
		$externalLink = $_POST['externalLink'];

		//connection for database
		$conn = new mysqli('localhost', 'root', '', 'esol');
		if ($conn->connect_error) {
			echo 'Connection Failed : ' . $conn->connect_error;
		} else {

			$query = "INSERT INTO donation (name, cause, image, amount, payment, externalLink) VALUES ('$name', '$cause', '$image', '$amount', '$payment', '$externalLink')";
			$conn->query($query);
			
			if ($conn->errno) {
				echo $conn->error;
				exit();
			}

			echo "donation successful";
			exit();
		}
	}
?>-->