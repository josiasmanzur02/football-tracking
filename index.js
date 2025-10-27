import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const port = 3000;
const app = express(); 

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
 
app.get("/", (req, res) => {   
    res.render("index.ejs"); 
});  
 
app.post("/choice", async (req, res) => {
    try {
        if (req.body.league) {
            const result = await axios.get("https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=" + req.body.league);
            res.render("index.ejs", { standings: result.data.table });
        } 

        if (req.body.team) {
            console.log(req.body.team);   
        }
    } catch (error) {  
        console.log(error); 
    }
});
 
app.listen(port, () => { 
    console.log(`Running on port ${port}`);
}); 