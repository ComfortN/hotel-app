const API_URL = 'http://localhost:8888';

export const sendBookingConfirmationEmail = async (bookingDetails) => {
  const emailData = {
    to: bookingDetails.email,
    subject: 'Booking Confirmation',
    text: `Thank you for your booking!
    
    Booking Details:
    Date: ${bookingDetails.date}
    Time: ${bookingDetails.time}
    Amount: $${bookingDetails.amount}
    
    We look forward to seeing you!`,
    html: `<h1>Thank you for your booking!</h1>
    <p><strong>Booking Details:</strong></p>
    <ul>
      <li>Date: ${bookingDetails.date}</li>
      <li>Time: ${bookingDetails.time}</li>
      <li>Amount: $${bookingDetails.amount}</li>
    </ul>
    <p>We look forward to seeing you!</p>`
  };

  try {
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


// allow create: if request.auth != null &&
//               request.resource.data.userId == request.auth.uid &&
//               request.resource.data.amount is number &&
//               request.resource.data.createdAt is timestamp;