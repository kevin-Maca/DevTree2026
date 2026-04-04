import app from './server' 
import {connectDB} from './config/db' 

const port = process.env.PORT || 4000 

connectDB(); 

app.listen(port, () =>{
    console.log('Server is running in port', port);
})