console.log(`Running script...`);

const config = require('config');
const twit = require('twit');

// Account Info
const Twit = new twit({
    consumer_key: config.twitter_account.consumer_key,
    consumer_secret: config.twitter_account.consumer_secret,
    access_token: config.twitter_account.access_token,
    access_token_secret: config.twitter_account.access_token_secret
})

//* ================ Development (Testing)

function retweet() {
  let params = {
    q: "#Trending min_retweets: 1 lang: en",
    result_type: "recent",
    count: 150,
  };

  Twit.get("search/tweets", params, (err, data, response) => {
  // tweets store the data we get back from the get request
    let tweets = data.statuses;

    if (!err) {

      for (let tweet of tweets) {

        let retweetId = tweet.id_str;

        Twit.post(
          "statuses/retweet/:id",
          { id: retweetId },
          (err, response) => {

          // like tweet
            Twit.post(
              "favorites/create",
              { id: retweetId },
              (err, response) => {

                if (response) {
                  console.log(`Post retweeted`);
                }

                if (err) {
                  console.log(`Already retweeted`);
                }
              }
            );
          }
        );
      }

    }

  });
}

retweet()