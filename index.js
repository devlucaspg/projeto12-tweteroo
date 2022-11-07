import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {console.log('Server is running in port: 5000')}); 

const users = [
    {username: "batman", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043232-avatar-batman-comics-hero_113278.png"},
    {username: "heisenberg", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043240-avatar-bad-breaking-chemisrty-heisenberg_113279.png"},
    {username: "harley_quinn", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043270-avatar-joker-squad-suicide-woman_113256.png"},
    {username: "marilyn", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043261-artist-avatar-marilyn-monroe_113252.png"},
    {username: "einstein", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043274-avatar-einstein-professor-scientist_113259.png"},
    {username: "donald_trump", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043269-avatar-male-president-trump_113267.png"},
    {username: "jason", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043253-friday-halloween-jason-movie_113258.png"},
    {username: "wonder_woman", avatar: "https://cdn.icon-icons.com/icons2/582/PNG/512/wonder-women_icon-icons.com_55030.png"}
];

const tweets = [
    {username: "donald_trump", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043269-avatar-male-president-trump_113267.png", tweet: "CENSORED FOR VIOLATING PLATFORM POLICIES"},
    {username: "harley_quinn", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043270-avatar-joker-squad-suicide-woman_113256.png", tweet: "Puddin..."},
    {username: "donald_trump", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043269-avatar-male-president-trump_113267.png", tweet: "CENSORED FOR VIOLATING PLATFORM POLICIES"},
    {username: "donald_trump", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043269-avatar-male-president-trump_113267.png", tweet: "CENSORED FOR VIOLATING PLATFORM POLICIES"},
    {username: "wonder_woman", avatar: "https://cdn.icon-icons.com/icons2/582/PNG/512/wonder-women_icon-icons.com_55030.png", tweet: "It is about what you believe. I believe in love and only love can save the world."},
    {username: "donald_trump", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043269-avatar-male-president-trump_113267.png", tweet: "CENSORED FOR VIOLATING PLATFORM POLICIES"},
    {username: "marilyn", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043261-artist-avatar-marilyn-monroe_113252.png", tweet: "A girl doesn't need anyone who doesn't need her."},
    {username: "donald_trump", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043269-avatar-male-president-trump_113267.png", tweet: "CENSORED FOR VIOLATING PLATFORM POLICIES"},
    {username: "heisenberg", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043240-avatar-bad-breaking-chemisrty-heisenberg_113279.png", tweet: "Say my name"},
    {username: "batman",    avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043232-avatar-batman-comics-hero_113278.png", tweet: "Make your fears afraid of you"},
    {username: "harley_quinn", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043270-avatar-joker-squad-suicide-woman_113256.png", tweet: "I am not sure if I attract crazy people or if I make them that way."},
    {username: "einstein", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043274-avatar-einstein-professor-scientist_113259.png", tweet: "Only two things are infinite, the universe and human stupidity, and I am not sure about the former"},
    {username: "einstein", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043274-avatar-einstein-professor-scientist_113259.png", tweet: "Life is like riding a bicycle. To keep your balance, you must keep moving. #coach"},
    {username: "jason", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043253-friday-halloween-jason-movie_113258.png", tweet: "looking forward to January 13, 2023..."},
    {username: "donald_trump", avatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043269-avatar-male-president-trump_113267.png", tweet: "CENSORED FOR VIOLATING PLATFORM POLICIES"},
];

app.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;

    if (!username || !avatar) {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }

    if (typeof username !== "string" || typeof avatar !== "string") {
        res.sendStatus(400);
        return;
    }

    users.push({ username, avatar });
    res.sendStatus(201);

});

app.get("/tweets", (req, res) => {

    const page = Number(req.query.page);
  
    if (page <= 0) {
        res.status(400).send("Informe uma página válida!");
        return;
    }
  
    if (page === undefined || page === 1) {
        res.send(tweets.slice(-10).reverse());
        return;
    }
  
    const start = page * -10;
    const end = (page - 1) * -10;

    const moreTweets = tweets.slice(start, end).reverse();

    res.send(moreTweets);

});

app.post("/tweets", (req, res) => {

    const { tweet } = req.body;
    const username = req.headers.user;
    const avatar = users.find(user => user.username === username).avatar;

    if (!tweet || !username) {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;

    }

    if (typeof username !== "string" || typeof tweet !== "string") {
        res.sendStatus(400);
        return;
    }
    
    tweets.push({ username, tweet, avatar });
    res.sendStatus(201);

});

app.get("/tweets/:username", (req, res) => {

    const { username } = req.params;
    const userTweets = tweets.filter((tweet) => tweet.username === username);
    
    res.send(userTweets.reverse());

  });
