window.onload = function () {
  const userID = "1271017558824456203";
  fetch(`https://api.lanyard.rest/v1/users/${userID}`)
    .then(response => response.json())
    .then(w => {
      const data = w.data;
      const info = data.discord_user;
      
      const usernameElement = document.getElementById('username');
      const avatarElement = document.getElementById('avatar');
      const statusIndicator = document.getElementById('status-indicator');
      const activityContainer = document.getElementById('activity-container');

      usernameElement.textContent = info.username;
      avatarElement.src = info.avatar
        ? `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.${info.avatar.startsWith("a_") ? 'gif' : 'png'}?size=512`
        : "https://cdn.discordapp.com/embed/avatars/5.png";

      statusIndicator.className = `status-${data.discord_status}`;

      if (data.activities && data.activities.length > 0) {
        const activity = data.activities[0];
        activityContainer.classList.remove('hidden');

        const activityIcon = document.getElementById('activity-icon');
        const activityName = document.getElementById('activity-name');
        const activityDetails = document.getElementById('activity-details');
        const activityState = document.getElementById('activity-state');

        if (activity.assets && activity.assets.large_image) {
          activityIcon.src = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
        } else {
          activityIcon.style.display = 'none';
        }

        activityName.textContent = activity.name;
        activityDetails.textContent = activity.details || '';
        activityState.textContent = activity.state || '';
      }

      avatarElement.style.opacity = 0;
      avatarElement.onload = function() {
        avatarElement.style.transition = 'opacity 0.5s ease-in-out';
        avatarElement.style.opacity = 1;
      };
    })
    .catch(error => console.error('Error fetching user data:', error));
};