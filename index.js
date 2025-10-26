import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.get("/", async (req, res) => { 
    try {
        const result = await axios.get("https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=Barcelona");
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        console.log(error.response.data);
        res.statusCode(500);
    }
});
 
app.listen(port, () => {
    console.log(`Running on port ${port}`);
}); 