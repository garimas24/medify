import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import{Grid} from '@mui/material/Grid'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

// BookingPage Component
const BookingPage = ({ selectedCenter }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    // Fetch available time slots for the selected date
    axios
      .get(
        `https://meddata-backend.onrender.com/timeslots?date=${selectedDate}`
      )
      .then((response) => setTimeSlots(response.data))
      .catch((error) => console.error("Error fetching time slots:", error));
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = (timeSlot) => {
    // Handle booking logic
    // Example API call to book appointment
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          Book Appointment at {selectedCenter.name}
        </Typography>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          maxDate={new Date().setDate(new Date().getDate() + 7)}
          placeholderText="Select Date"
        />
        <Grid container spacing={2} style={{ marginTop: 20 }}>
          {timeSlots.map((slot) => (
            <Grid item key={slot} xs={6} sm={4} md={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleBooking(slot)}
              >
                {slot}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

// MyBookingsPage Component
const MyBookingsPage = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`https://meddata-backend.onrender.com/bookings?userId=${userId}`)
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [userId]);

  return (
    <Grid container spacing={3}>
      {bookings.map((booking) => (
        <Grid item xs={12} sm={6} md={4} key={booking.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{booking.medicalCenterName}</Typography>
              <Typography variant="body2">Date: {booking.date}</Typography>
              <Typography variant="body2">Time: {booking.time}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// Parent Component
const MedicalBookingSystem = ({ selectedCenter, userId }) => {
  return (
    <div>
      <BookingPage selectedCenter={selectedCenter} />
      <MyBookingsPage userId={userId} />
    </div>
  );
};

export default MedicalBookingSystem;
