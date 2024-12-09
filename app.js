const express = require('express');
const { GoogleAuth } = require('google-auth-library');

const app = express();
const PORT = 5000;

app.get('/get-access-token', async (req, res) => {
    const auth = new GoogleAuth({
        keyFile: 'nutripal-4bd4e-d6a96c73156e.json',
        scopes: 'https://www.googleapis.com/auth/cloud-platform',
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    res.json({ access_token: token });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
