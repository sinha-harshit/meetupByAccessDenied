const mongoose = require("mongoose");

//Connecting to db
mongoose.connect("mongodb+srv://NewUser:YQ0F5Ng9nndvI1E9@cluster0.bce1h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( () => console.log("DB Connection successful..."))
.catch( (err) => console.log("DB connection failed..."));