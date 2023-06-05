const { response } = require('express');
const express=require('express');
const bodyParser=require('body-parser');
const https=require('https');
const { urlencoded } = require('body-parser');
const app=express();
const port=3000;
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})
app.use(bodyParser.urlencoded({extended:true}));

app.post('/',function(req,res){
    const location_d=req.body.location;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+location_d+"&units=metric&appid=cb8cb4ddffda7a7666c992c48b4ee008";
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data) ;
            const temperature=weatherData.main.temp ;
            const description_d=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            res.write("<h1>The temperature at "+ location_d+" is "+temperature+" degrees Celsius</h1>");
            res.write("<p>The decription of weather is "+ description_d+'</p>');
            const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<img src="+imgurl+">");
          res.send();
        })
    })
    
})


app.listen(3000,function(){
    console.log('Server is running on port 3000') ;
})
