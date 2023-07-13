const express = require('express')
const app = express()
require('./db/connection')
const Member1=require('./models/member')
const Destination=require('./models/Destination')
const Order=require('./models/order')
const Quries=require('./models/Quries')
const path=require('path')
const hbs=require('hbs')
const port = 80
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// paths
const templatesPath=path.join(__dirname,'templates/views');
const partialsPath=path.join(__dirname,'templates/partials');
// setting templates
app.set('view engine', 'hbs')
app.set('views', templatesPath);
// for css 
app.use(express.static('public'));
app.use(express.static('pictures'));
hbs.registerPartials(partialsPath);
app.get('/', (req, res) => {
  res.render('index');
})

// signin
app.get('/signin',(req,res)=>
{
  res.render('signin');
})
app.post('/signin',async(req,res)=>
{
  try{
    const email=req.body.email;
    const password=req.body.password;
    console.log(email +"   and "+password);
    const userEmail=await Member1.findOne({email:email});
    //console.log(userEmail);
    if(userEmail.password==password)
    {
      res.status(201).render('des');
    }else{
      res.send("details are not correct");
    }
    
  }catch(error)
  {
    console.log("server error");
  }
})

// registeration 
app.get('/registeration',(req,res)=>
{
    res.render('registeration')
})
app.post('/registeration',async(req,res)=>
{
  try{
    const user=await new Member1(req.body);
    console.log(user);
    user.save();
    res.render('des');
  }catch(e)
  {
    console.log("error");
  }
})


// for showing all data
app.get('/all',(req,res)=>
{
  res.render('des');
})

// searched data
app.get('/search',(req,res)=>
{
  res.render('search');
})
app.post('/search',async(req,res)=>
{
  try{
    const place=req.body.name;
    console.log(place+" is searched");
    const search=await Destination.findOne({name:place});
    console.log(search);
    res.render('show',{search:search});
  }catch(error)
  {
    console.log("error");
  }
})

// filing bookin page
app.get('/book',(req,res)=>
{
  res.render('book');
})
app.post('/book',async(req,res)=>
{
  try{
    const id= req.body.id
    console.log(id);
    const search_id= await Destination.findById(id);
    console.log(search_id.name);
    console.log(search_id.price);
    let obj={
      name:search_id.name,
      price:search_id.price
    }
    res.render('book',{demo:obj})
  }catch(error)
  {
    console.log("error");
  }
})
// for order
app.get('/order',(req,res)=>
{
  res.render('book');
})
app.post('/order',async(req,res)=>
{
  try{
    const booking=await new Order(req.body);
  ///  console.log(booking);
    if(booking.seats>1)
    {
      booking.price=booking.seats*booking.price;
    }
    booking.save();
    res.render('message');
  }catch(error)
  {
    console.log("booking error")
  }
})

// quire page
app.get('/quries',(req,res)=>
{
  res.render('quries');
})
app.post('/quries',async(req,res)=>
{
  try{
    const user_quries=await new Quries(req.body);
   // console.log(user_quries);
    user_quries.save();
    res.render('message')
  }catch(error)
  {
    console.log("quries error");
  }
})
//
// creating destination api
app.post('/destination',async(req,res)=>
{
  try{
    const destinations=await new Destination(req.body);
    console.log(destinations);
    destinations.save();

  }catch(error)
  {
    console.log("error");
  }
})

app.get('/destination',async(req,res)=>
{
  try{
    const des=await Destination.find();
    res.send(des);
  }catch(error)
  {
    console.log("error");
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})