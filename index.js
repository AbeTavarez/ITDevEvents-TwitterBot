
const config = require('config');
const twit = require('twit');

// Account Info
const Twit = new twit({
    consumer_key: config.twitter_account.consumer_key,
    consumer_secret: config.twitter_account.consumer_secret,
    access_token: config.twitter_account.access_token,
    access_token_secret: config.twitter_account.access_token_secret
})

function retweet(){
    // module.exports.twitterBot = (event, context, callback) => {
        let params = {
            q:'#Trending min_retweets: 1 lang: en',
            result_type: 'recent',
            count: 150
        }
    
        Twit.get('search/tweets', params, (err, data, response) => {
            let tweets = data.statuses
            if(err) {
                for (let dat of tweets) {
                    let retweetId = dat.id_str;
                    Twit.post('statuses/retweet/:id', {id: retweetId}, (err, response) => {
                        Twit.post('favorites/create', {id: retweetId}, (err, response) => {
                            if (response) {
                                console.log(`Post retweeted`);
                                // return callback(null, `Post retweeted and favorited! with retweetId-${retweetId}`)
                            }
    
                            if (err){
                                console.log(`Already retweeted`);
                                // return callback(`Already retweeted`, null)
                            }
                        })
                    })
                }
            }
        })
    // }
}

retweet()