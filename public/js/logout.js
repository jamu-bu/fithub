// log out function
const logoutHandler = async () => {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace("/"); // send to homepage
    } else {
      alert(response.statusText);
    }
  };

// Event listener
document.querySelector("#LOGOUT").addEventListener("click", logoutHandler);
