function showStep(step) {
 const sections = ['landing-section', 'success-section', 'signin-section', 'buy-coffee-section'];
 sections.forEach(id => {
 document.getElementById(id).classList.add('hidden');
 });
 document.getElementById(step).classList.remove('hidden');
 document.getElementById('mainContent').focus();
}

// Password show/hide toggle
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('newsletter-password');

togglePasswordBtn.addEventListener('click', function() {
 const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
 passwordInput.setAttribute('type', type);
 this.textContent = type === 'password' ? '👁️' : '🙈';
 this.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password');
});

// Store signed-up user data (simple in-memory demo store)
let registeredUser = null;

// Newsletter form submission handler
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
 e.preventDefault();

 // Collect signup form data  const name = document.getElementById('newsletter-name').value.trim();
 const email = document.getElementById('newsletter-email').value.trim();
 const password = document.getElementById('newsletter-password').value;
 const agreeChecked = document.getElementById('newsletter-agree').checked;

 // Basic validation
 if (!name || !email || !password || !agreeChecked) {
 alert('Please fill all fields and agree to receive newsletter updates.');
 return;
 }

 // Save user data
 registeredUser = {
 name,
 email,
 password
 };

 // Clear form for security
 this.reset();

 // Show success section
 showStep('success-section');
});

// Move from success to signin
document.getElementById('to-signin-btn').addEventListener('click', function() {
 showStep('signin-section');
 document.getElementById('signin-email').focus();
});

// Sign in form submission handler
document.getElementById('signin-form').addEventListener('submit', function(e) {
 e.preventDefault();

 if (!registeredUser) {
 alert('No registered user found. Please sign up first.');
 showStep('landing-section');
 return;
 }

 const inputEmail = document.getElementById('signin-email').value.trim();
 const inputPassword = document.getElementById('signin-password').value;

 if (inputEmail === registeredUser.email && inputPassword === registeredUser.password) {
 showStep('buy-coffee-section');
 this.reset();
 } else {
 alert('Incorrect email or password. Please try again.');
 showStep('landing-section');
 document.getElementById('newsletter-name').focus();
 }
});

// Initialize page with landing section visible
showStep('landing-section');


document.getElementById('landing-signin-btn').addEventListener('click', function() {
  showStep('signin-section');
  document.getElementById('signin-email').focus();
});
