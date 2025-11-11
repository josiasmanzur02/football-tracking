import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
// Keep the base URL in one spot so swapping to a personal API key is painless.
const SPORTS_DB_BASE_URL = "https://www.thesportsdb.com/api/v1/json/123";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => { 
  res.render("index.ejs");
});

app.post("/choice", async (req, res) => {
  const { league, team } = req.body;

  // Gently nudge the user if they forgot to pick something or tried both at once.
  if ((league && team) || (!league && !team)) {
    const message = league && team
      ? "Please choose either a league or a team, not both."
      : "Choose a league or a team to continue.";
    return res.status(400).render("index.ejs", { error: message });
  }

  try {
    if (league) {
      // Pull the latest standings for the selected league.
      const leagueResponse = await axios.get(`${SPORTS_DB_BASE_URL}/lookuptable.php?l=${league}`);
      return res.render("index.ejs", { standings: leagueResponse.data.table });
    }

    if (team) {
      // Grab the most recent and upcoming fixtures at the same time.
      const [nextGame, prevGame] = await Promise.all([
        axios.get(`${SPORTS_DB_BASE_URL}/eventsnext.php?id=${team}`),
        axios.get(`${SPORTS_DB_BASE_URL}/eventslast.php?id=${team}`)
      ]);

      const nextEvent = nextGame.data?.events?.[0] || null;
      const previousEvent = prevGame.data?.results?.[0] || null;

      return res.render("index.ejs", { next: nextEvent, previous: previousEvent });
    }

    return res.render("index.ejs");
  } catch (error) {
    // Log whatever TheSportsDB tells us and show a friendly fallback.
    const statusCode = error.response?.status || 502;
    console.error("Error fetching data from TheSportsDB:", error.response?.data || error.message);
    return res.status(statusCode).render("index.ejs", {
      error: "We couldn't load data from TheSportsDB. Please try again shortly."
    });
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
