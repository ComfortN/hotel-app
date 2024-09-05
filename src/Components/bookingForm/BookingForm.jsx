import React, { useState } from 'react';
import { TextField, Button, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function BookingForm() {
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    const handleAdultsChange = (event) => {
        setAdults(event.target.value);
    };

    const handleChildrenChange = (event) => {
        setChildren(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic
    };
  return (
    <div className="booking-form">
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="adults-label">Adults</InputLabel>
                    <Select
                        labelId="adults-label"
                        value={adults}
                        onChange={handleAdultsChange}
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
                        value={children}
                        onChange={handleChildrenChange}
                    >
                        {[...Array(10).keys()].map(num => (
                            <MenuItem key={num} value={num}>
                                {num}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Check-in Date"
                        value={checkInDate}
                        onChange={(newValue) => setCheckInDate(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />

                    <DatePicker
                        label="Check-out Date"
                        value={checkOutDate}
                        onChange={(newValue) => setCheckOutDate(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                </LocalizationProvider>

                <Button type="submit" variant="contained" color="primary">
                    Book Now
                </Button>
            </form>
        </div>
    )
}
