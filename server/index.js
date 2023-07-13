const express =require('express');
const mongo = require('./config/db');
const dotenv = require('dotenv');
const morgan =require('morgan');
const cors = require('cors');
const { requireSignin, isAdmin} = require('./middlewares/authMiddleware');

//configs
dotenv.config()
const app = express();
mongo();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/auth/',require('./routes/register'));
app.use('/auth/',require('./routes/login'));
app.use('/auth/',require('./routes/forgotPassword'));
app.use('/category/',require('./routes/category'));
app.use('/products/',require('./routes/products'));
app.use('/filter/',require('./routes/filter'));
app.use('/cart/',require('./routes/cart'));
app.use('/orders/',require('./routes/orders'));

app.get('/user-auth', requireSignin ,(req,res)=>{
    res.send({ok:true});
})
app.get('/admin-auth',isAdmin ,(req,res)=>{
    res.send({ok:true});
})


app.get('/',(req,res)=>{
    res.send("hello my new app")
})

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("server connected");
})