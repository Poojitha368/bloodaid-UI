// const url = 'http://localhost/bloodaidphp-api' // this is for php api

const url = 'http://localhost:5000' // this is for py api

function shownavigation() {
  let loggedin = false;
  let role_id = -1;

  // Retrieve login data from local storage
  const x = localStorage.getItem("login");
  const y = JSON.parse(x);

  // Check if user is logged in
  if (y == null) {
    console.log("user not logged in");
  } else {
    loggedin = true;
    role_id = y["role_id"];
    console.log("user logged in", y["role_id"]);
  }

  // Default state: Only show login and register links if not logged in
  if (!loggedin) {
    $("#login_form_link").show();
    $("#register_form_link").show();
    $("#logout").hide();

    // Hide all role-specific links
    $("#donor_form_link").hide();
    $("#patient_form_link").hide();
    $("#view_requests_link").hide();
    $("#view_donations_link").hide();
    $("#blood_stock_link").hide();
    $("#donor_history_link").hide();
    $("#patient_history_link").hide();
    $("#donor_requests_link").hide();
    $("#patient_requests_link").hide();
  } else {
    // Hide login and register when logged in
    $("#login_form_link").hide();
    $("#register_form_link").hide();
    $("#logout").show();

    // Show links based on the role of the logged-in user
    if (role_id == 1) {
      // Donor role-specific navigation
      $("#donor_form_link").hide();
      $("#patient_form_link").hide();
      $("#view_requests_link").hide();
      $("#view_donations_link").hide();
      $("#blood_stock_link").show();
      $("#donor_history_link").show();
      $("#patient_history_link").show();
      $("#donor_requests_link").show();
      $("#patient_requests_link").show();

      // Load default view for role 1
      loadViewStock();
    } else if (role_id == 2) {
      // Patient role-specific navigation
      $("#donor_form_link").show();
      $("#patient_form_link").show();
      $("#view_requests_link").show();
      $("#view_donations_link").show();
      $("#blood_stock_link").hide();
      $("#donor_history_link").hide();
      $("#patient_history_link").hide();
      $("#donor_requests_link").hide();
      $("#patient_requests_link").hide();

      // Load default view for role 2 (e.g., Donor Form)
      loadDonorForm();
    }
  }
}

// Function to load donor form
function loadregisterForm() {
  $("#main_content")
    .html(`<div class="container d-flex justify-content-center align-items-center min-vh-100 " id="register_div">
    <form id = "register_form" class="row g-3 col-md-6 col-lg-4" action="/register" method="post">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Username</label>
          <input type="text" class="form-control" id="username" name="Username">
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" name="password">
        </div>

        <div class="col-12">
          <label for="inputPhone" class="form-label">Email Address</label>
          <input type="email" class="form-control" id="email" name="email">
        </div>

        <div class="col-12">
          <label for="inputPhone" class="form-label">Phone</label>
          <input type="text" class="form-control" id="phonenumber" name="phone_number">
        </div>

        <div class="col-md-6">
          <label for="inputDOB" class="form-label">Date of Birth</label>
          <input type="date" class="form-control" id="DOB" name="dob">
        </div>
        <div class="col-md-6">
          <label for="inputBloodGroup" class="form-label">Blood Group</label>
          <select id="bloodgroup" name="blood_group" class="form-select">
            <option value="" disabled selected>Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div class="col-12">
          <label for="inputAddress" class="form-label">Address</label>
          <input type="text" name="address" class="form-control" id="address" placeholder="1234 Main St">
        </div>

        <div class="col-md-6">
          <label for="inputCity" class="form-label">City</label>
          <input type="text" class="form-control" id="city" name="city">
        </div>
        <div class="col-md-6">
          <label for="inputState" class="form-label">State</label>
          <select id="state" name="state" class="form-select">
            <option value="">Select a State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
             <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
          </select>
        </div>

        <div class="col-md-12">
          <label for="inputZip" class="form-label">Pincode</label>
          <input type="text" class="form-control" id="pincode" name="pincode">
        </div>

        <div class="col-12">
            <button type="submit" class="btn btn-primary bg-danger">Register</button>
        </div>
    </form>
</div>

`);
  $("#register_form").on("submit", function (e) {
    e.preventDefault(); // Prevent page refresh

    const Data = {
      username: $("#username").val(),
      password: $("#password").val(),
      phone_number: $("#phonenumber").val(),
      email: $("#email").val(),
      DOB: $("#DOB").val(),
      bloodgroup: $("#bloodgroup").val(),
      address: $("#address").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      pincode: $("#pincode").val(),
    };

    console.log(Data);

    $.ajax({
      url:  url + "/register", // API endpoint
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(Data),

      success: function (response) {
        console.log(response);
        localStorage.setItem("register", JSON.stringify(response));

        loadloginForm();

        const elem = `  <div class2="alert alert-success" role="alert">
              registration successfully!
            </div>`;
        $("#register_form").append(elem);
      },
      error: function (error) {
        console.error("Error:", error);
        const elem = `  <div class="alert alert-danger" role="alert">
              Registration failed!
            </div>`;
        $("#register_form").append(elem);
      },
    });
  });
}

// Function to load donor form
function loadloginForm() {
  $("#main_content")
    .html(`<div class="container d-flex justify-content-center align-items-center min-vh-100" style="margin-top: -50px;">
    <div id="login_div" class="d-flex flex-column align-items-center" style="width: 100%; max-width: 375px;">
        <h1 class="text-center mb-4">Login</h1>
        <form action="/login" id="login_form" method="post" class="w-100" style="padding: 20px; background-color: #f8f9fa; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" name="username" class="form-control" id="username" aria-describedby="emailHelp" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="password" required>
            </div>
            <input type="submit" value="Login" class="btn btn-primary w-100 bg-danger">
            <p id="redirect_register" class="text-center mt-3">Don't have an account? <a href="#">Register here</a></p>
        </form>
    </div>
</div>



`);

$("#redirect_register").on("click", loadregisterForm);

  $("#login_form").on("submit", function (e) {
    e.preventDefault(); // Prevent page refresh

    const Data = {
      username: $("#username").val(),
      password: $("#password").val(),
    };

    console.log(Data);

    $.ajax({
      url: `${url}/login`, // API endpoint
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(Data),

      success: function (response) {
        console.log(response);
        localStorage.setItem("login", JSON.stringify(response));

        shownavigation();

        const elem = `  <div class="alert alert-success" role="alert">
              Login successfully!
            </div>`;
        $("#login_form").append(elem);
      },
      error: function (error) {
        console.error("Error:", error);
        const elem = `  <div class="alert alert-danger" role="alert">
              Login failed!
            </div>`;
        $("#login_form").append(elem);
      },
    });
  });
}

// Function to load donor form
function loadDonorForm() {
  $("#main_content")
    .html(`  <div class="row justify-content-center align-items-center" style="min-height: 80vh;">
<div class="col-md-3">
      <h3 style="text-align: center;"> Donote blood</h3>
        <form class="g-3 mb-3"  id="donor_form" method="post">

            <div class="mb-3">
                <label for="units" class="form-label">Units of blood (in ml)</label>
                <input type="number" class="form-control" id="units" name="units" required>
            </div>
            <div class="mb-3">
                <label for="disease" class="form-label">Disease if any</label>
                <input type="text" class="form-control" id="disease" name="disease" required>
            </div>
            <div class="mb-3">
                <label for="donated-date" class="form-label">Donated date</label>
                <input type="date" class="form-control" id="donated_date" name="donated-date" required>
            </div>
            <div class="d-grid">
                <button class="btn btn-primary bg-danger" type="submit">Donate</button>
            </div>
        </>
    </div>
</div>
</div>
      
    `);

  $("#donor_form").on("submit", function (e) {
    e.preventDefault(); // Prevent page refresh

    const Data = {
      units: $("#units").val(),
      disease: $("#disease").val(),
      donated_date: $("#donated_date").val(),
    };

    console.log(Data);
    const loginData = localStorage.getItem("login");

    // Parse the login data to extract user_id
    const parsedData = JSON.parse(loginData);
    const userId = parsedData.user_id;

    $.ajax({
      url: `${url}/donor_form/${userId}`, // API endpoint
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(Data),

      success: function (response) {
        console.log(response);
        const elem = `  <div class="alert alert-success" role="alert">
            Donation submitted successfully!
          </div>`;
        $("#donor_form").append(elem);
      },
      error: function (error) {
        console.error("Error:", error);
        const elem = `  <div class="alert alert-success" role="alert">
            Donation submitted successfully!
          </div>`;
        $("#donor_form").append();
      },
    });
  });
}

// Function to load patient form
function loadPatientForm() {

  
  $("#main_content")
    .html(`  <div class="row justify-content-center align-items-center" style="min-height: 80vh;">
<div class="col-md-3">
      <h3 style="text-align: center;"> Request blood</h3>
        <form class="g-3 mb-3" id="patient_form" method="post">

            <div class="mb-3">
                <label for="units" class="form-label">Units of blood (in ml)</label>
                <input type="number" class="form-control" id="units" name="units" required>
            </div>
            <div class="mb-3">
                <label for="reason" class="form-label">reason</label>
                <input type="text" class="form-control" id="reason" name="reason" required>
            </div>
            <div class="mb-3">
                <label for="Requested date" class="form-label">Requested date</label>
                <input type="date" class="form-control" id="requested_date" name="Requested date" required>
            </div>
            <div class="d-grid">
                <button class="btn btn-primary bg-danger" type="submit">Request</button>
            </div>
        </form>
    </div>
</div>
</div>
    `);

  $("#patient_form").on("submit", function (e) {
    e.preventDefault(); // Prevent page refresh

    const Data = {
      units: $("#units").val(),
      reason: $("#reason").val(),
      requested_date: $("#requested_date").val(),
    };
    console.log(Data);
    const loginData = localStorage.getItem("login");

    // Parse the login data to extract user_id
    const parsedData = JSON.parse(loginData);
    const userId = parsedData.user_id;
    console.log(Data);

    $.ajax({
      url: `http://localhost:5000/patient_form/${userId}`,
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(Data),
      success: function (response) {
        const elem = `  <div class="alert alert-success" role="alert">
        Request  submitted successfully!
      </div>`;
    $("#patient_form").append(elem);
      },
      error: function (error) {
        console.error("Error:", error);
       
      },
    });
  });
}

// Function to load view requests
function loadViewRequests() {

  const loginData = localStorage.getItem("login");



  // Parse the login data to extract user_id
  const parsedData = JSON.parse(loginData);
  const userId = parsedData.user_id;

  $("#main_content").html(`
    <h3 style="text-align:center;">View Blood Requests</h3>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>User Id</th>                
                <th>Units</th>                

                <th>Reason</th>
                <th>Requested Date</th>
            </tr>
        </thead>
        <tbody id="request_table_body"></tbody>
    </table>
`);

  $.ajax({
    url: `http://localhost:5000/view_requests/${userId}`,
    type: "GET",
    dataType: "json",
    success: function (response) {
      let tableBody = "";
      response.viewrequests.forEach(function (request) {
        tableBody += `<tr>
                            <td>${request.user_id}</td>
                            <td>${request.units}</td>
                            <td>${request.reason}</td>
                            <td>${request.requested_date}</td>
                          </tr>`;
      });
      $("#request_table_body").html(tableBody);
    },
    error: function (error) {
      console.error("Error fetching requests:", error);
      alert("Failed to fetch requests.");
    },
  });
}

// Function to load view donations
function loadViewDonations() {
  // Retrieve user_id from local storage
  const loginData = localStorage.getItem("login");


  // Parse the login data to extract user_id
  const parsedData = JSON.parse(loginData);
  const userId = parsedData.user_id;

  if (!userId) {
    console.log("User is not logged in.");
    return;
  }

  $("#main_content").html(`
    <h3 style="text-align:center;">View Blood Donations</h3>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>User ID</th>
                <th>Units</th>
                <th>Disease</th>
                <th>Donated Date</th>
            </tr>
        </thead>
        <tbody id="donation_table_body"></tbody>
    </table>
  `);

  // Make AJAX request to fetch donations for the logged-in user
  $.ajax({
    url: `http://localhost:5000/view_donations/${userId}`, // Using dynamic user_id
    type: "GET",
    dataType: "json",
    success: function (response) {
      let tableBody = "";

      response.donations.forEach(function (donation) {
        tableBody += `<tr>
                          <td>${donation.user_id}</td>  
                          <td>${donation.units}</td>
                          <td>${donation.disease}</td>
                          <td>${donation.donated_date}</td>
                        </tr>`;
      });

      $("#donation_table_body").html(tableBody);
    },
    error: function (error) {
      console.error("Error fetching donations:", error);
    },
  });
}

// Function to load view stock
function loadViewStock() {
  $("#main_content").html(`<div class="container mt-5">
      <h1>Blood Stock</h1>
      <div class="row" id="blood-stock-container">
          <!-- Blood stock data will be dynamically loaded here -->
      </div>
  </div>

    
    `);

  // to fetch bloodstock data
  $.ajax({
    url: "http://localhost:5000/blood_stock", // Endpoint to fetch blood stock data
    method: "GET",
    success: function (data) {
      let container = $("#blood-stock-container");

      // Clear the container
      container.empty();

      // Iterate over the JSON data and generate cards
      $.each(data, function (blood_group, units) {
        let card = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${blood_group}</h5>
                                <p class="card-text">Units: ${units} ml</p>
                            </div>
                        </div>
                    </div>
                `;
        container.append(card);
      });
    },
    error: function (error) {
      console.error("Error fetching blood stock data:", error);
    },
  });
}

// Function to load donor history
function loadDonorHistory() {
  $("#main_content").html(`
    <h3 style="text-align:center;">Admin Donor History</h3>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Donation Id</th>
                <th>Blood group </th>
                <th>Units</th>
                <th>Disease</th>
                <th>Donated_date</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody id="donor_history_table_body"></tbody>
    </table>
`);

  $.ajax({
    url: "http://localhost:5000/donor_history",
    type: "GET",
    dataType: "json",
    success: function (response) {
      let tableBody = "";
      response.donorhistory.forEach(function (entry) {
        tableBody += `<tr>
                            <td>${entry.donation_id}</td>
                            <td>${entry.blood_group}</td>
                            <td>${entry.units}</td>
                            <td>${entry.disease}</td>
                            <td>${entry.donated_date}</td>
                            <td>${entry.status}</td>
                          </tr>`;
      });
      $("#donor_history_table_body").html(tableBody);
    },
    error: function (error) {
      console.error("Error fetching donor history:", error);
    },
  });
}

// Function to load patient history
function loadPatientHistory() {
  $("#main_content").html(`
    <h3 style="text-align:center;">Admin Patient History</h3>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Request Id</th>
                <th>Bloodgroup </th>
                <th>Units</th>
                <th>Reason</th>
                <th>Requested_date</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody id="patient_history_table_body"></tbody>
    </table>
`);

  $.ajax({
    url: "http://localhost:5000/patient_history",
    type: "GET",
    dataType: "json",
    success: function (response) {
      let tableBody = "";
      response.patienthistory.forEach(function (entry) {
        tableBody += `<tr>
                            <td>${entry.request_id}</td>
                            <td>${entry.blood_group}</td>
                            <td>${entry.units}</td>
                            <td>${entry.reason}</td>
                            <td>${entry.requested_date}</td>
                            <td>${entry.status}</td>
                          </tr>`;
      });
      $("#patient_history_table_body").html(tableBody);
    },
    error: function (error) {
      console.error("Error fetching patient history:", error);
      alert("Failed to fetch patient history.");
    },
  });
}

// Function to load donor requests
function loadDonorRequests() {
  $("#main_content").html(`
    <h1>Admin Donor Requests</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Donor ID</th>
          <th>Username</th>
          <th>Blood Group</th>
          <th>Units</th>
          <th>Disease</th>
          <th>Donated Date</th>
          <th>Phone Number</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody id="donation_request_table_body"></tbody>
    </table>
  `);

  $.ajax({
    url: "http://localhost:5000/donation_requests",
    type: "GET",
    headers: { accept: "application/json" },
    success: function (response) {
      let tableBody = "";

      response.donationrequests.forEach((entry) => {
        tableBody += `<tr>
                        <td>${entry.donation_id}</td>
                        <td>${entry.username}</td>
                        <td>${entry.blood_group}</td>
                        <td>${entry.units}</td>
                        <td>${entry.disease}</td>
                        <td>${entry.donated_date}</td>
                        <td>${entry.phone_number}</td>
                        <td id="status_${entry.donation_id}">`;

        if (entry.status === "pending") {
          tableBody += `<button class="btn btn-success update-donation-request" data-id="${entry.donation_id}" data-status="accepted">Accept</button>
                        <button class="btn btn-danger update-donation-request" data-id="${entry.donation_id}" data-status="rejected">Reject</button>`;
        } else {
          tableBody += `<span>${entry.status}</span>`;
        }

        tableBody += `</td></tr>`;
      });

      $("#donation_request_table_body").html(tableBody);

      // Handle button clicks
      $(".update-donation-request").click(function () {
        const donationId = $(this).data("id");
        const status = $(this).data("status");
        const Data = {
          status: status,
        };

        $.ajax({
          url: `http://localhost:5000//update_donation_request/${donationId}`,
          type: "PUT",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify(Data),
          success: function (response) {
            // Update the status text and remove the buttons
            $(`button[data-id="${donationId}"]`).remove(); // Remove the clicked button
            $(`#status_${donationId}`).html(`<span>${status}</span>`); // Update status text
          },
          error: function (error) {
            console.error("Error accepting donation:", error);
          },
        });
      });
    },
    error: function (error) {
      console.error("Error fetching donation requests:", error);
    },
  });
}

// Function to load patient requests
function loadPatientRequests() {
  $("#main_content").html(`
    <h1>Admin Patient Requests</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Patient ID</th>
          <th>Username</th>
          <th>Blood Group</th>
          <th>Units</th>
          <th>Reason</th>
          <th>Requested Date</th>
          <th>Phone Number</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody id="patient_request_table_body"></tbody>
    </table>
  `);

  $.ajax({
    url: "http://localhost:5000/patient_requests",
    type: "GET",
    headers: { accept: "application/json" },
    success: function (response) {
      let tableBody = "";
      response.patientrequests.forEach(function (entry) {
        tableBody += `<tr>
                        <td>${entry.request_id}</td>
                        <td>${entry.username}</td>
                        <td>${entry.blood_group}</td>
                        <td>${entry.units}</td>
                        <td>${entry.reason}</td>
                        <td>${entry.requested_date}</td>
                        <td>${entry.phone_number}</td>
                        <td id="status_${entry.request_id}">`;

        if (entry.status === "pending") {
          tableBody += `<button class="btn btn-success update-patient-request" data-id="${entry.request_id}" data-status="accepted">Accept</button>
                        <button class="btn btn-danger update-patient-request" data-id="${entry.request_id}" data-status="rejected">Reject</button>`;
        } else {
          tableBody += `<span>${entry.status}</span>`;
        }

        tableBody += `</td></tr>`; // Closing the table row properly
      });

      $("#patient_request_table_body").html(tableBody);
      
      // Handle button clicks
      $(".update-patient-request").click(function () {
        const requestId = $(this).data("id");
        const status = $(this).data("status");
        console.log(status);
        const Data = {
          status: status,
        };

        $.ajax({
          url: `http://localhost:5000/update_patient_request/${requestId}`,
          type: "PUT",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify(Data),
          success: function (response) {
            // Update the status text and remove the buttons
            $(`button[data-id="${requestId}"]`).remove(); // Remove the clicked button
            $(`#status_${requestId}`).html(`<span>${status}</span>`); // Update status text
          },
          error: function (error) {
            console.error("Error accepting request:", error);
          },
        });
      }
      

   );

    },
    error: function (error) {
      console.error("Error fetching request:", error);
    },
  });
}

$(document).ready(function () {
  console.log("page loaded");
  // Event handlers
  $("#donor_form_link").on("click", loadDonorForm);
  $("#patient_form_link").on("click", loadPatientForm);
  $("#view_requests_link").on("click", loadViewRequests);
  $("#view_donations_link").on("click", loadViewDonations);
  $("#blood_stock_link").on("click", loadViewStock);
  $("#donor_history_link").on("click", loadDonorHistory);
  $("#patient_history_link").on("click", loadPatientHistory);
  $("#donor_requests_link").on("click", loadDonorRequests);
  $("#patient_requests_link").on("click", loadPatientRequests);
  $("#login_form_link").on("click", loadloginForm);
  $("#register_form_link").on("click", loadregisterForm);
  $("#logout").on("click", loadloginForm);
  shownavigation();

  $("#logout").on("click", function () {
    localStorage.removeItem("login");
    shownavigation();
  });
});
