const express = require('express');
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const bodyParser = require('body-parser')
// Other configurations and middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Mount the blog routes
app.use('/blog', blogRoutes);

// Other routes and configurations

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
