document.addEventListener('DOMContentLoaded', () => {
    const eventsContainer = document.getElementById('events-container');
    const triggerButton = document.getElementById('trigger-event');
    
    const eventSource = new EventSource('/events');
  
    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      const messageElement = document.createElement('p');
      messageElement.textContent = `${eventData.message} - ${eventData.timestamp}`;
      eventsContainer.appendChild(messageElement);
    };
  
    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
    };
  
    triggerButton.addEventListener('click', () => {
      fetch('/events/send', { method: 'POST' })
        .then(response => {
          if (response.ok) {
            console.log('Custom event triggered');
          } else {
            console.error('Failed to trigger custom event');
          }
        })
        .catch(error => console.error('Error triggering custom event:', error));
    });
  });
  