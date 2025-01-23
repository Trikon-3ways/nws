const express=require("express");
const bodyParser=require("body-parser")
const request=require("request");
const http=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    var firtsname =req.body.Fname;
    var lastsname =req.body.Lname;
    var Email =req.body.Email;
    console.log(firtsname);
    console.log(lastsname);
    console.log(Email);
    var data={
      members:  [
            {
                email_address:Email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firtsname,
                    LNAME: lastsname
                }
            }
    ]
    
    };
    const jsonData=JSON.stringify(data);
    const url='https://us15.api.mailchimp.com/3.0/lists/2145228b1de3f584f76af9b6ea5d53e0-us15';
    const Option={
        method:"POST",
        auth:"Ayush:4734613c20cbf9c834d76cc7c78cda8d-us15"
    }
   const request= http.request(url,Option,function(response){
    if(response.statusCode===200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();
})
app.post("/failure",function(req,res)
{
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("server is started");
});


// Api
// 4734613c20cbf9c834d76cc7c78cda8d-us15
// List Id
// c6321429b2
