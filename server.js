const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { faExplosion } = require('@fortawesome/free-solid-svg-icons');

const app = express();
const port = 8000;

app.use(express.json())

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));


const userSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            unique: true,
        },
        pwd: {
            type: String,
            required: true,
            
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)
    app.post('/users', async(req,res)=>{


        const {
            user,
            pwd,
        } = req.body;
    
    
        try {
            const existingUser = await User.findOne({user});
            // const existingPassword = await User.findOne({pwd})

            if (existingUser ){
                return res.status(409).json({error : "username already exists"});
            }

            const hashedPassword = await bcrypt.hash(pwd, 10);

            const newUser = new User({user,pwd: hashedPassword})
            await newUser.save();
            res.status(200).json(newUser)
        } catch (error) {
            console.error("Error saving user: ", error);
            res.status(500).json({error: "Internal server error"})
            
        }
    })

//to handle the login
// Authentication endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ user:username });
  
      if (!existingUser) {
        return res.status(401).json({ error: 'user not registered' });
      }
  
      

      // Compare provided password with hashed password in the database
      // const hashedPassword = await bcrypt.hash(password, 10);
      const isPasswordValid = await bcrypt.compare(password, existingUser.pwd);
      
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Password is valid, create and send token here
      // Example using JWT:
      const token = jwt.sign({ userId: existingUser._id }, 'your_secret_key');
  
      res.json({ message: 'Login successful', token });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// app.listen(port, ()=> console.log("server is running on port 8000"))
// Other server setup and routes...

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://mihretunode:Q@methane.0fjzoxr.mongodb.net/signIn?retryWrites=true&w=majority")
.then(() => {
 console.log('MongoDB connected...')
 
 app.listen(port, () => console.log(`Server is running on port ${port}`))
})
.catch(err => console.error('Could not connect to MongoDB...', err))
