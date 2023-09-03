import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import cors from 'cors'
import axios from 'axios';

const PORT=process.env.PORT
const app=express();

//Permite enviar os dados do servidor para o front-End(Next js)
app.use(cors())


//Regras de acesso para a api-spotify
const options = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/search/',
  params: {
    q: 'adele',
    type: 'multi',
    offset: '0',
    limit: '15',
    numberOfTopResults: '5'
  },
  headers: {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': process.env.KEY_HOST
  }
};



app.get("/",async (req,res)=>{
  var data=[]
    
try {

	const response = await axios.request(options);
  const result =await response.data
  
  result.artists.items.forEach(item =>{
    data.push({ img:item.data.visuals.avatarImage.sources[0].url,
    audio:"",
    name:item.data.profile.name})
  })

  result.tracks.items.forEach((item,index)=>{
     data[index].audio=item.data.uri
  })


  res.json(data) //Alimentado 

} catch (error) {
	console.error(error);
}
    
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})