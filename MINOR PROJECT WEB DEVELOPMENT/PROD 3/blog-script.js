document.getElementById('comment-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('commenter-name').value.trim();
  const email = document.getElementById('commenter-email').value.trim();
  const commentText = document.getElementById('comment-content').value.trim();

  if (!name || !email || !commentText) {
    alert('Please fill in all fields.');
    return;
  }

  // Escape HTML
  const escapedComment = commentText.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Format timestamp like static example
  const now = new Date();
  const months = [
    'January','February','March','April','May','June','July',
    'August','September','October','November','December'
  ];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const dateString = `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;

  // Add to DOM
  const commentSection = document.querySelector('.comments-section');
  const newComment = document.createElement('article');
  newComment.className = 'comment';
  newComment.innerHTML = `
    <header>
      <p><strong>${name}</strong> <time datetime="${now.toISOString()}">${dateString}</time></p>
    </header>
    <p>${escapedComment}</p>
  `;
  commentSection.insertBefore(newComment, commentSection.querySelector('.comment-form-section'));
  e.target.reset();
});
