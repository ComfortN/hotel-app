import React, { useState } from 'react';
import '../../styles/BookingForm.css';
import { updateBookingDetails } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function BookingForm() {

    // Fetch pricePerNight from the Redux store
    const { pricePerNight } = useSelector((state) => state.cart.selectedRoom) || { pricePerNight: 0 };


    // Initialize state for booking data with default values
    const [bookingData, setBookingData] = useState({
        checkInDate: dayjs(),
        checkOutDate: dayjs().add(1, 'day'),
        adults: 1,
        children: 0,
        pricePerNight,
        rooms:1
    });

    const dispatch = useDispatch();


     // Handle changes in input fields for adults and children
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    // Handle changes in date picker fields
    const handleDateChange = (name) => (newValue) => {
        setBookingData((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };


    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Calculate total price
        const numberOfNights = bookingData.checkOutDate.diff(bookingData.checkInDate, 'day');
        const totalPrice = numberOfNights * bookingData.pricePerNight * bookingData.rooms;

        const bookingDataToSend = {
            ...bookingData,
            checkInDate: bookingData.checkInDate.toISOString(),
            checkOutDate: bookingData.checkOutDate.toISOString(),
            totalPrice,
        };
        
        dispatch(updateBookingDetails(bookingData));
    };


  return (
    <div className="booking-form">
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="adults-label">Adults</InputLabel>
                    <Select
                        labelId="adults-label"
                        name='adults'
                        value={bookingData.adults}
                        onChange={handleChange}
                    >
                        {[...Array(10).keys()].map(num => (
                            <MenuItem key={num} value={num + 1}>
                                {num + 1}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="children-label">Children</InputLabel>
                    <Select
                        labelId="children-label"
                        name='children'
                        value={bookingData.children}
                        onChange={handleChange}
                    >
                        {[...Array(10).keys()].map(num => (
                            <MenuItem key={num} value={num}>
                                {num}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="rooms-label">Rooms</InputLabel>
                    <Select
                        labelId="rooms-label"
                        name='rooms'
                        value={bookingData.rooms}
                        onChange={handleChange}
                    >
                        {[...Array(10).keys()].map(num => (
                            <MenuItem key={num} value={num + 1}>
                                {num + 1}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Check-in Date"
                        name='checkInDate'
                        value={bookingData.checkInDate}
                        onChange={handleDateChange('checkInDate')}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />

                    <DatePicker
                        label="Check-out Date"
                        name='checkOutDate'
                        value={bookingData.checkOutDate}
                        onChange={handleDateChange('checkOutDate')}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                </LocalizationProvider>

                <Button type="submit" variant="contained" color="primary">
                    Add to Cart
                </Button>

            </form>
        </div>
    )
}
