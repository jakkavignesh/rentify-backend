const exp = require('express')
const app = exp()
const cors = require('cors')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
app.use(cors())
app.use(exp.json())

const DB = "mongodb+srv://jakkavignesh2002:VigneshJakka@productpricetracker.6u0wkqb.mongodb.net/"

mongoose.connect(DB).then(()=> {
    console.log("DB connected")
}).catch(err => {
    console.log(err)
})

const verifyToken = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    console.log(token);
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, "kasjdh;wlekriu3wo;i4u2i343enrf,msn,fdnwaelrjwelrkjlk#$LKL@@@LKJ#@$");
        req.user = data.user;
        next();
    } catch (error) {
        next(error);
    }
}

const sendPostingEmail = async (user) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "b15productpricetracker@gmail.com",
              pass: "nucvokqwzbgmkogp",
            },
        });
        const mailOptions = {
            from: {
                name: "Rentify",
                address: "b15productpricetracker@gmail.com"
            },
            to: `${user.email}`,
            subject: `Posted House Details`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #007bff;">Posted Car Ride Details</h2>
                    <p><strong>Location:</strong> ${user.location}</p>
                    <p><strong>Flat name:</strong> ${user.flatname}</p>
                    <p><strong>No.of bedrooms:</strong> ${user.bedrooms}</p>
                    <p><strong>No.of bathrooms:</strong> ${user.bathrooms}</p>
                    <p><strong>No.of hospitals near by:</strong> ${user.hospitals}</p>
                    <p><strong>Price:</strong> ${user.price}</p>
                    <p><strong>Posting ID:</strong> ${user.postingId}</p>
                    <p>Thank you for posting the ride to DriveTogether</p>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch(err) {
        console.log(err);
    }
}

const sendBookingEmailToOwner = async (bookedFlat, userEmail, userPhone) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "b15productpricetracker@gmail.com",
              pass: "nucvokqwzbgmkogp",
            },
        });
        const mailOptions = {
            from: {
                name: "Rentify",
                address: "b15productpricetracker@gmail.com"
            },
            to: `${bookedFlat.email}`,
            subject: `Your Flat has been purchased`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #007bff;">Flat purchase details</h2>
                    <p><strong>Purchased User Email:</strong> ${userEmail}</p>
                    <p><strong>Purchased User Phone:</strong> ${userPhone}</p>
                    <p><strong>Location:</strong> ${bookedFlat.location}</p>
                    <p><strong>Flat Name:</strong> ${bookedFlat.flatname}</p>
                    <p><strong>No.of Bedrooms:</strong> ${bookedFlat.bedrooms}</p>
                    <p><strong>No.of Bathrooms:</strong> ${bookedFlat.bathrooms}</p>
                    <p><strong>No.of hospitals near by:</strong> ${bookedFlat.hospitals}</p>
                    <p><strong>Price:</strong> ${bookedFlat.price}</p>
                    <p><strong>Porpertry Likes:</strong> ${bookedFlat.propertyLikes}</p>
                    <p><strong>Posting ID:</strong> ${bookedFlat.postingId}</p>
                    <p>Thank you Rentify</p>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch(err) {
        console.log(err);
    }
}

const sendBookingEmailToUser = async (bookedFlat, userEmail, ownerPhone) => {
    
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "b15productpricetracker@gmail.com",
              pass: "nucvokqwzbgmkogp",
            },
        });
        const mailOptions = {
            from: {
                name: "Rentify",
                address: "b15productpricetracker@gmail.com"
            },
            to: `${userEmail}`,
            subject: `Flat purchase confirmation`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #007bff;">Flat purchase details</h2>
                    <p><strong>Owner Email:</strong> ${bookedFlat.email}</p>
                    <p><strong>Owner Phone:</strong> ${ownerPhone}</p>
                    <p><strong>Location:</strong> ${bookedFlat.location}</p>
                    <p><strong>Flat Name:</strong> ${bookedFlat.flatname}</p>
                    <p><strong>No.of Bedrooms:</strong> ${bookedFlat.bedrooms}</p>
                    <p><strong>No.of Bathrooms:</strong> ${bookedFlat.bathrooms}</p>
                    <p><strong>No.of hospitals near by:</strong> ${bookedFlat.hospitals}</p>
                    <p><strong>Porpertry Likes:</strong> ${bookedFlat.propertyLikes}</p>
                    <p><strong>Price:</strong> ${bookedFlat.price}</p>
                    <p><strong>Posting ID:</strong> ${bookedFlat.postingId}</p>
                    <p>Thank you for purchasing the flat with Rentify</p>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch(err) {
        console.log(err);
    }
}

const sendOwnerDetails = async (ownerEmail, ownerPhone, userEmail) => {
    
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "b15productpricetracker@gmail.com",
              pass: "nucvokqwzbgmkogp",
            },
        });
        const mailOptions = {
            from: {
                name: "Rentify",
                address: "b15productpricetracker@gmail.com"
            },
            to: `${userEmail}`,
            subject: `Flat Owner details`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #007bff;">Flat Owner details</h2>
                    <p><strong>Owner Email:</strong> ${ownerEmail}</p>
                    <p><strong>Owner Phone:</strong> ${ownerPhone}</p>
                    <p>Thank you Rentify</p>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch(err) {
        console.log(err);
    }
}

const userSchema = new mongoose.Schema({
    Name: String,
    email: String,
    password: String,
    confirmpassword: String,
    phone: String
})

const postSchema = new mongoose.Schema({
    location: String,
    flatname: String,
    bedrooms: Number,
    bathrooms: Number,
    hospitals: Number,
    price: String,
    postingId: Number,
    email: String,
    propertyLikes: Number,
    propertyAvailable: Boolean
})


const bookSchema = new mongoose.Schema({
    location: String,
    flatname: String,
    bedrooms: Number,
    bathrooms: Number,
    hospitals: Number,
    price: String,
    postingId: Number,
    email: String,
    propertyLikes: Number
})

const database = mongoose.model("rentifyUsers", userSchema)

const postdatabase = mongoose.model("rentifyPosts", postSchema)

const bookingdatabase = mongoose.model("rentifyBookings", bookSchema)

app.post("/login", async(req, res) => {
    const { email, password } = req.body
    try{
        const user = await database.findOne({email: email})
        if(user){
            if(user.password === password){
                const token = await jwt.sign({ email: user.email }, 'kasjdh;wlekriu3wo;i4u2i343enrf,msn,fdnwaelrjwelrkjlk#$LKL@@@LKJ#@$');
                res.send({message: "Login Successful", user: user.Name, status: true, email: user.email, phone: user.phone, token: token})
            }else{
                res.send({message: "Invalid details", status: false})
            }
        }else{
            res.send({message: "Invalid details", status: false})
        }
    }
    catch(err){
        console.log(err)
    }
})

app.post('/register', async(req, res) => {
    const { Name, email, password, confirmPassword, phone } = req.body
    try{
        const user = await database.findOne({email: email})
        if(user){
            res.send({message: "User already exists", status: false})
        }else{
            const user = new database({Name, email, password, confirmPassword, phone});
            await user.save()
            res.send({message: "Successfully Registered", status: true})
        }
    }
    catch (err){
        console.log(err)
    }
})

app.post("/postProperty", verifyToken, async(req, res) => {
    const { location, flatname, bedrooms, bathrooms, hospitals, price, postingId, email } = req.body
    const propertyLikes = 0;
    const propertyAvailable = true;
    try{
        const user = new postdatabase({location, flatname, bedrooms, bathrooms, hospitals, price, postingId, email, propertyLikes, propertyAvailable});
        await user.save()
        await sendPostingEmail(user);
        res.send({message: "Successfully Posted", status: true, data: user})
    }
    catch (err){
        console.log(err)
    }
})

app.post("/bookFlat", verifyToken, async (req, res) => {
    const { location } = req.body;
    let flats = await postdatabase.find({ 
        location: location,
    })
    console.log(flats)
    if(flats.length === 0) {
        res.json({ status: false, message: 'No flats available for the specified criteria' });
    }
    else {
        res.status(200).json({ status: true, message: 'Flats found', data: flats });
    }
});

app.post("/makeBooking", verifyToken, async (req, res) => {
    const { location, flatname, bedrooms, bathrooms, hospitals, price, postingId, userEmail, userPhone } = req.body;
    console.log(postingId);
    
    // Find the booked car
    let bookedFlat = await postdatabase.findOne({ postingId: postingId });
    let ownerDetails = await database.findOne({ email: bookedFlat.email });
    console.log(ownerDetails.phone);
    
    if (!bookedFlat) {
        return res.send({ status: false, message: 'Car not found' });
    }

    // Check if there are enough remaining seats
    if (!bookedFlat.propertyAvailable) {
        return res.send({ status: false, message: 'Property not available' });
    }

    // Update remaining seats
    bookedFlat.propertyAvailable = false

    try {
        // Save the updated car
        await bookedFlat.save();
        console.log(bookedFlat.email);
        const user = new bookingdatabase({
            location: bookedFlat.location,
            flatname: bookedFlat.flatname,
            bedrooms: bookedFlat.bedrooms,
            bathrooms: bookedFlat.bathrooms,
            hospitals: bookedFlat.hospitals,
            price: bookedFlat.price,
            postingId: bookedFlat.postingId,
            email: userEmail,
            propertyLikes: bookedFlat.propertyLikes
        });
        await user.save()
        await sendBookingEmailToUser(bookedFlat, userEmail, ownerDetails.phone);
        await sendBookingEmailToOwner(bookedFlat, userEmail, userPhone);
        res.send({ status: true, message: 'Booking successful', data: bookedFlat });
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error booking the flat' });
    }
});

app.post("/updatePropertyLikes/:postingId", verifyToken, async (req, res) => {
    const postingId = req.params.postingId;
    try {
        const result = await postdatabase.updateOne({ postingId: postingId }, { $inc: { propertyLikes: 1 } });
        res.send({ status: true, message: 'Property likes updated successfully', data: result });
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error updating property likes' });
    }
});

app.post("/getOwnerDetails/:postingId", verifyToken, async (req, res) => {
    const postingId = req.params.postingId;
    const { userEmail } = req.body;
    try {
        const result = await postdatabase.findOne({ postingId: postingId });
        const ownerDetails = await database.findOne({ email: result.email });
        const email = ownerDetails.email;
        const phone = ownerDetails.phone;
        await sendOwnerDetails(email, phone, userEmail);
        res.send({ status: true, message: 'Owner details fetched successfully', data: result });
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error fetching owner details' });
    }
})

app.post('/myPostings', verifyToken, async (req, res) => {
    try {
        const postings = await postdatabase.find({ email: req.body.userEmail });
        console.log(postings)
        res.send({ status: true, message: 'Postings fetched successfully', data: postings });
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error fetching postings' });
    }
})

app.post('/myPurchases', verifyToken, async (req, res) => {
    try {
        const bookings = await bookingdatabase.find({ email: req.body.userEmail });
        res.send({ status: true, message: 'Bookings fetched successfully', data: bookings });
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error fetching bookings' });
    }
})

app.post("/userProfile", verifyToken, async (req, res) => {
    const { userEmail } = req.body
    console.log(userEmail)
    const userDetails = await database.findOne({ email: userEmail });
    const totalBookings = await bookingdatabase.find({ email: userEmail }).count();
    const totalPostings = await postdatabase.find({ email: userEmail }).count();
    const user = { userDetails, totalBookings, totalPostings };
    res.send({ status: true, message: 'User fetched successfully', data: user });
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})