const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public")); //* public files to server ... eg.styles.js, images

app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/2d42380a0f"
    const options = {
        method :"POST",
        auth : "lucky123:2927a3d6a5b54124fb4d3b7574d22e28-us14"
    }

    const request = https.request(url, options ,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();

})


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});


// api key mailchimp
// 2927a3d6a5b54124fb4d3b7574d22e28-us14

// list Id 
// 2d42380a0f