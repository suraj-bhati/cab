const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all requests

// Proxy endpoint for category availability
app.get('/category-availability/p2p', async (req, res) => {
    const { pickupLat, pickupLng, dropLat, dropLng, pickupMode, leadSource } = req.query;
    try {
        const response = await axios.get('https://book.olacabs.com/data-api/category-availability/p2p', {
            params: {
                pickupLat,
                pickupLng,
                dropLat,
                dropLng,
                pickupMode: pickupMode || 'NOW',
                leadSource: leadSource || 'desktop_website',
                silent: true
            },
            headers: {
                'accept': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Error fetching data from Ola API' });
    }
});

app.listen(8080, () => {
    console.log('Proxy server running on port 8080');
});
