// Hamburger menu JS starts

function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

// Hamburger menu JS ends

// dark mode starts

const options = {
  bottom: "20px", // default: '32px'
  right: "20px", 
  left: "unset", 
  time: "0.5s", 
  mixColor: "#fff", // default: '#fff'
  backgroundColor: "#fff", // default: '#fff'
  buttonColorDark: "#100f2c", // default: '#100f2c'
  buttonColorLight: "#fff", // default: '#fff'
  saveInCookies: false, // default: true,
  label: "🌓", // default: ''
  autoMatchOsTheme: true,
};

const darkmode = new Darkmode(options);
darkmode.showWidget();

// dark mode ends

// New members adding form starts

// Get the New Message button and the right-side div
const newMessageBtn = document.querySelector(
  ".btn-container .btn--2 .dropdown-item:nth-child(2)"
);
const rightSide = document.querySelector("#right-side");

// Get the contact form HTML
const contactFormHtml = `

  <div class="form-container">
    <h2>New Contact</h2>
    <form>
      <div class="form-row">
        <label for="phone-number">Phone Number</label>
        <input
          type="text"
          id="phone-number"
          placeholder="Phone Number"
          required
        />
      </div>
      <div class="form-row">
        <label for="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          placeholder="First Name"
          required
        />
      </div>
      <div class="form-row">
        <label for="last-name">Last Name</label>
        <input type="text" id="last-name" placeholder="Last Name" />
      </div>
      <div class="form-actions">
        <button type="submit" id="add-btn">ADD</button>
        <button type="button" id="cancel-btn">CANCEL</button>
      </div>
    </form>
  </div>
`;
// Event listener for when the New Message button is clicked
newMessageBtn.addEventListener("click", () => {
  // Set the HTML of the right-side div to the contact form HTML
  rightSide.innerHTML = contactFormHtml;

  // Get the form and the cancel button
  const form = document.querySelector(".form-container form");
  const cancelBtn = document.querySelector("#cancel-btn");

  // Event listener for when the form is submitted
  form.addEventListener("submit", (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get the input values
    const phoneNumber = document.querySelector("#phone-number").value;
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;

    // Do something with the input values (e.g. add the new contact to a database)
    console.log(`New contact added: ${firstName} ${lastName} (${phoneNumber})`);

    // Clear the form
    form.reset();

    // Remove the contact form from the right-side div
    rightSide.innerHTML = "";
  });

  // Event listener for when the cancel button is clicked
  cancelBtn.addEventListener("click", () => {
    // Clear the form
    form.reset();
    // Remove the contact form from the right-side div
    rightSide.innerHTML = "";
  });
});

// adding to MONGODB storage starts
async function addContact() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  // Create a new Contact object
  const contact = { firstName, lastName, phoneNumber };

  // Send a POST request to your server to add the contact to MongoDB
  const response = await fetch("/addContact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  // Check the response status
  if (response.status === 200) {
    console.log("Contact added successfully!");

    // Clear the input fields
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phoneNumber").value = "";

    // Show a pop-up message that the contact has been added successfully
    const popUp = document.createElement("div");
    popUp.innerText = "✔ Contact added successfully!";
    popUp.classList.add("pop-up");
    document.body.appendChild(popUp);

    // Remove the pop-up message after 3 seconds
    setTimeout(() => {
      document.body.removeChild(popUp);
    }, 3000);
  } else {
    console.log("Error adding contact!");
  }
}

// adding to MONGODB storage ends

// --------------------------------------------------------------------------------------------------------

// server side/backend code use this starts
// app.post("/addContact", async (req, res) => {
//   try {
//     const contact = req.body; // Get the contact object from the request body
//     const result = await db.collection("contacts").insertOne(contact); // Add the contact to MongoDB

//     res.status(200).send(); // Send a success response
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(); // Send an error response
//   }
// });

// server side/backend code use this ends

// --------------------------------------------------------------------------------------------------------

// New members adding form ends

//search functionality for chatting starts

const searchInput = document.querySelector("#search-bar input");
const searchResult = document.querySelector("#search-result");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query === "") {
    searchResult.innerHTML = "";
    return;
  }
  fetch(`/search?q=${query}`)
    .then((res) => res.text())
    .then((name) => {
      if (name !== "") {
        searchResult.innerHTML = `<div class="profile-box">
          <div class="profile-image"></div>
          <div class="user-info">
            <div class="user-name">${name}</div>
            <div class="user-status">Offline</div>
          </div>
        </div>`;
      } else {
        searchResult.innerHTML = "";
      }
    })
    .catch((err) => console.error(err));
});

// --------------------------------------------------------------------------------------------------------

// server side/backend code use this starts

// API endpoint for searching contacts
// app.get('/search', (req, res) => {
//   const query = req.query.q.toLowerCase();
//   contacts.findOne({ name: { $regex: `^${query}` } }, (err, result) => {
//     if (err) throw err;
//     if (result) {
//       res.send(result.name);
//     } else {
//       res.send('');
//     }
//   });
// });
// server side/backend code use this ends

// --------------------------------------------------------------------------------------------------------

//search functionality for chatting ends
