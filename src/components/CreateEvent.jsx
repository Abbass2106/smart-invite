import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [result, setResult] = useState();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setResult("Creating event...");

        const eventID = "AEF" + Date.now();
        try {
            const formData = new FormData(e.target);
            const plainObject = Object.fromEntries(formData.entries());
            plainObject.eventID = eventID; // Ensure eventID is included
            const jsonString = JSON.stringify(plainObject);

            const response = await axios.post("http://localhost/php-crud-rest-api-main/api.php", jsonString);

            if (response.status === 200) {
                navigate("/view-events", { state: { eventID } });
            } else {
                setResult("Error creating event.");
            }
        } catch (error) {
            console.error(error);
            setResult("An error occurred while creating the event.");
        }

        e.target.reset();
    };

    return (
        <div>
            <div className="header">
                <h1>Create Event</h1>
            </div>

            <div className='d-flex flex-column align-items-center mt-5 '>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="hostName">Host Name:</label>
                        <input type="text" id="hostName" name="hostName" required />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" required />
                    </div>
                    <div>
                        <label htmlFor="brideName">Bride Name:</label>
                        <input type="text" id="brideName" name="brideName" required />
                    </div>
                    <div>
                        <label htmlFor="groomName">Groom Name:</label>
                        <input type="text" id="groomName" name="groomName" required />
                    </div>
                    <div>
                        <label htmlFor="eventDate">Event date:</label>
                        <input type="date" id="eventDate" name="eventDate" required />
                    </div>
                    <div>
                        <label htmlFor="location">Location:</label>
                        <input type="text" id="location" name="location" required />
                    </div>
                    <div>
                        <label htmlFor="color1">Color 1:</label>
                        <input type="text" id="color1" name="color1" required />
                    </div>
                    <div>
                        <label htmlFor="color2">Color 2:</label>
                        <input type="text" id="color2" name="color2" required />
                    </div>
                    <div>
                        <label htmlFor="color3">Color 3:</label>
                        <input type="text" id="color3" name="color3" required />
                    </div>
                    <div>
                        <label htmlFor="phoneNumbers">Phone Numbers (comma separated):</label>
                        <input type="text" id="phoneNumbers" name="phoneNumbers" required />
                    </div>

                    <input type='hidden' id='eventID' name='eventID' value={"AEF" + Date.now()} readOnly />
                </form>


                <button type="submit" className='btn btn-primary  p-3' >Create Event</button>
            </div>

            <p>{result}</p>
        </div>
    );
};

export default CreateEvent;
