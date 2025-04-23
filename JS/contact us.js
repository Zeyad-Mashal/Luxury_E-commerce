function copyEmail() {
    const email = document.getElementById("emailText").textContent;
    navigator.clipboard.writeText(email);
    document.getElementById("copiedMsg").style.display = "block";
    setTimeout(() => document.getElementById("copiedMsg").style.display = "none", 1500);
  }
  