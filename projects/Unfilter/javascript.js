// hamburger for responsive navbar
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Section reveal on scroll
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
});

// Forms input validation
function validateForm() {
  let isValid = true;
  let name = document.getElementById('name').value;
  let userName = document.getElementById('user-name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirm-password').value;

  if (name == "") {
    document.querySelector('.feedback').innerText = 'please enter your name!';
    document.getElementById('name').classList.add('fail');
    isValid = false;
  } else {
    document.querySelector('.feedback').innerText = '';
    document.getElementById('name').classList.add('success');

  }

  if (userName == "") {
    document.getElementById('user-name').parentElement.querySelector('.feedback').innerText = 'Username is required';
    document.getElementById('user-name').classList.add('fail');
    isValid = false;
  } else {
    document.getElementById('user-name').parentElement.querySelector('.feedback').innerText = '';
    document.getElementById('user-name').classList.add('success');

  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (email == "" || !emailValid) {
    document.getElementById('email').parentElement.querySelector('.feedback').innerText = 'Enter a valid email';
    document.getElementById('email').classList.add('fail');
    isValid = false;
  } else {
    document.getElementById('email').parentElement.querySelector('.feedback').innerText = '';
    document.getElementById('email').classList.add('success');
  }
  const passwordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password);
  if (password == '' || !passwordValid) {
    document.getElementById("password").parentElement.querySelector(".feedback").innerText = "Please Enter a minimum 8 characters long password with at least one uppercase letter, one lowercase letter and one number";
    document.getElementById("password").classList.add("fail");
    isValid = false;
  } else {
    document.getElementById("password").parentElement.querySelector(".feedback").innerText = '';
    document.getElementById("password").classList.add("success");
  }
  if (!(confirmPassword === password) || confirmPassword == '') {
    document.getElementById("confirm-password").parentElement.querySelector(".feedback").innerText = "Password didn't match!";
    document.getElementById("confirm-password").classList.add("fail");
    isValid = false;
  } else {
    document.getElementById("confirm-password").parentElement.querySelector(".feedback").innerText = '';
    document.getElementById("confirm-password").classList.add("success");
  }
  return isValid;
}

function validateLoginForm() {
  let isValid = true;
  let email = document.getElementById('login-email').value;
  let password = document.getElementById('login-password').value;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (email == "" || !emailValid) {
    document.getElementById('login-email').parentElement.querySelector('.feedback').innerText = 'Enter a valid email';
    document.getElementById('login-email').classList.add('fail');
    isValid = false;
  } else {
    document.getElementById('login-email').parentElement.querySelector('.feedback').innerText = '';
    document.getElementById('login-email').classList.add('success');
  }
  const passwordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password);
  if (password == '' || !passwordValid) {
    document.getElementById("login-password").parentElement.querySelector(".feedback").innerText = "Please Enter a minimum 8 characters long password with at least one uppercase letter, one lowercase letter and one number";
    document.getElementById("login-password").classList.add("fail");
    isValid = false;
  } else {
    document.getElementById("login-password").parentElement.querySelector(".feedback").innerText = '';
    document.getElementById("login-password").classList.add("success");
  }

  return isValid;
}

// Select all options functionality 
const selectAll = document.getElementById("select-all");
const checkboxes = document.querySelectorAll(".platform");
selectAll.addEventListener("change", () => {
  checkboxes.forEach(checkbox => {
    checkbox.checked = selectAll.checked;
  });
});

// Switch between login and signup forms
const loginLink = document.getElementById("login-link");
loginLink.addEventListener("click", function (e) {
  e.preventDefault();

  document.querySelector(".signup-form").style.display = "none";
  document.querySelector(".login-form").style.display = "block";
});

const signupLink = document.getElementById("signup-link");
signupLink.addEventListener("click", function (e) {
  e.preventDefault();

  document.querySelector(".login-form").style.display = "none";
  document.querySelector(".signup-form").style.display = "block";
});


// Navigate betweeen input fileds using up/down arrows
const inputs = document.querySelectorAll(".input-control input");
inputs.forEach((input, index) => {
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" && index < inputs.length - 1) {
      inputs[index + 1].focus();
      e.preventDefault();
    }
    if (e.key === "ArrowUp" && index > 0) {
      inputs[index - 1].focus();
      e.preventDefault();
    }
  });
});


// Parallax effect for hero
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (hero) hero.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
});

// Demo loader for image upload
const imageUpload = document.getElementById('image-upload');
const filteredImg = document.getElementById('filtered-img');
const unfilteredImg = document.getElementById('unfiltered-img');
const loader = document.createElement('div');
loader.className = 'demo-loader';
if (imageUpload) {
  imageUpload.parentNode.insertBefore(loader, imageUpload.nextSibling);
  imageUpload.addEventListener('change', (e) => {
    loader.style.display = 'block';
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        setTimeout(() => {
          filteredImg.src = ev.target.result;
          unfilteredImg.src = ev.target.result;
          filteredImg.style.filter = 'contrast(1.2) saturate(1.5) blur(1px)';
          unfilteredImg.style.filter = 'none';
          loader.style.display = 'none';
        }, 900);
      };
      reader.readAsDataURL(file);
    } else {
      loader.style.display = 'none';
    }
  });
}
