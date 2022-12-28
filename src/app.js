const express=require("express");
const bodyparser=require("body-Parser");
const request=require("request");
const https=require("https");
const e = require("express");
const port = process.env.PORT || 3001;

const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/signup.html")
    console.log("News Letter")
});

app.post("/",function(req,res)
{
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    
    
var data ={
    members: [
        {
            email_address: email,
            status:"subscribed",
            merge_fields:
            {
                FNAME: firstName,
                LNAME: lastName
            }

        }
    ]
}

var jsonData = JSON.stringify(data);

const url =  "https://us21.api.mailchimp.com/3.0/lists/4ad1a4ab39";

const option ={
    method: "POST",
    auth: "chandru:e16b1652c57b5471fcea4b68b6f664a9-us21"
}

const request=https.request(url,option, function(response)
{

    if(response.statusCode == 200)
    {
        res.sendFile(__dirname + "/success.html")
    }
    else
    {
        res.sendFile(__dirname + "/failure.html")
    }
    response.on("data",function(data)
    {
        console.log(JSON.parse(data))
    })
})

request.write(jsonData);
request.end();

})

app.post("/failure",function(req,res)
{
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`server started on port ${port}`);
  });

// API KEY
// <!-- e16b1652c57b5471fcea4b68b6f664a9-us21 -->
// AUDIENCE ID
// 4ad1a4ab39