import React from 'react'
import '../../styles/CheckAvailabilityForn.css'

export default function CheckAvaillabilityForm() {
  return (
    <div className='the-form'>
        <form className="booking-form">
          <input type="date" placeholder="Arrival Date" onFocus={(e) => e.target.type = 'date'} />
          <input type="date" placeholder="Departure Date" />
          <select>
            <option value="">No. of Rooms</option>
            <option value="1">1 Room</option>
            <option value="2">2 Rooms</option>
            <option value="3">3 Rooms</option>
          </select>
          <select>
            <option value="">No. of Guests</option>
            <option value="1">2 Guest</option>
            <option value="2">4 Guests</option>
            <option value="3">6 Guests</option>
          </select>
          <button type="submit" className="check-availability-btn">Check Availability</button>
        </form>
    </div>
  )
}
