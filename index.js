const form = document.getElementById("form");
const donate_btn = document.getElementById("donate-btn");
const close_btn = document.getElementById("close-btn");
const modal = document.getElementsByClassName("modal");
const main = document.getElementById("main");
const donations = document.getElementById("donations");
const back_btn = document.getElementById("back-btn");

form.addEventListener("submit", function (e) {
	e.preventDefault();

	const body = new FormData();

	body.append('name', form.name.value);
	body.append('cause', form.cause.value);
	const file = form.image.files[0];
	body.append('image', file, file.name);
	body.append('amount', form.amount.value);
	body.append('payment', form.payment.value);
	body.append('externalLink', form.externalLink.value);
	
	const x_http = new XMLHttpRequest();

	x_http.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			if (x_http.responseText == "donation successful") {
				form.reset();
				close_btn.click();
			}
			alert(x_http.responseText);
		}
	}

	x_http.open("POST", "donate.php", true);
	x_http.send(body);
});


donate_btn.addEventListener("click", function () {
	modal[0].style.visibility = 'visible';
	modal[0].style.opacity = 1;
});

close_btn.addEventListener("click", function () {
	modal[0].style.visibility = 'hidden';
	modal[0].style.opacity = 0;
});

function fetchDonations(cause) {
	const x_http = new XMLHttpRequest();

	x_http.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			main.style.display = "none";
			donations.style.display = "block";
			const donationList = document.getElementById("donations-table");
			const causeTitle = document.getElementById("cause-title");

			causeTitle.innerText = cause;

			const donation = JSON.parse(x_http.responseText);
			donationList.innerHTML = "";

			donation.forEach(function (donation) {
				donationList.innerHTML += `
					<tr class="donation">
						<td>${donation.name}</td>
						<td>${donation.cause}</td>
						<td>${donation.amount}</td>
						<td>${donation.payment}</td>
						<td><img src="${donation.image}" alt="Photo"/></td>
						<a target="_blank" href="${project.externalLink}">externalLink</a>
					</tr>
				`;
			});
		}
	}


	x_http.open("GET", "donate.php?cause=" + cause, true);
	x_http.send();
}

back_btn.addEventListener("click", function () {
	main.style.display = "block";
	donations.style.display = "none";
});

let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');    
}

window.onscroll = () =>{
    navbar.classList.remove('active');

    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}

window.onload = () =>{
    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}
