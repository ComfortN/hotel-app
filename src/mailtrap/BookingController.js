const API_URL = 'http://localhost:8888';

export const sendBookingConfirmationEmail = async (bookingDetails) => {
  const emailData = {
    to: bookingDetails.email,
    subject: 'Booking Confirmation',
    text: `Dear ${bookingDetails.firstName} ${bookingDetails.lastName},
    
    Thank you for your booking!
    
    Booking Details:
      Check-in: ${bookingDetails.checkInDate}
      Check-out: ${bookingDetails.checkOutDate}
      Amount: R${bookingDetails.amount}
      Accommodation: ${bookingDetails.name}
    
    We'll be in touch regarding the status of your booking.
    
    Best regards,
    LuxeStay Hote;`,
    
    html: `<h1>Dear ${bookingDetails.firstName} ${bookingDetails.lastName},</h1>
    <p>Thank you for your booking!</p>
    <p><strong>Booking Details:</strong></p>
    <ul>
      <li>Check-in: ${bookingDetails.checkInDate}</li>
      <li>Check-out: ${bookingDetails.checkOutDate}</li>
      <li>Amount: R${bookingDetails.amount}</li>
      <li>Accommodation: ${bookingDetails.name}</li>
    </ul>
    <p>We'll be in touch regarding the status of your booking.</p>
    <p>Best regards,</p>
    <p>LuxeStay Hotel</p>`
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
