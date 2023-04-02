const db = require('../config/connection');
const { User } = require('../models');
const postSeeds = require('./postSeeds.json');
const userSeeds = require('./userSeeds.json');
const friendSeeds = require('./friendSeeds.json');

const { mongoose } = require('mongoose');

db.once('open', async () => {
  try {
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let index = 0; index < userSeeds.length; index++) {
      for (let i = 0; i < postSeeds.length; i++) {

        await User.findOneAndUpdate(
          { username: userSeeds[index].username },
          {
            $addToSet: {
              posts: {
                _id: mongoose.Types.ObjectId(),
                postText: postSeeds[i].postText,
                postAuthor: userSeeds[index].username,
                comments: postSeeds[i].comments
              },
            },
          },
          {
            $addToSet:{
              friends: {
                friendUsername: friendSeeds[i].friendUsername,
                topTenRank: friendSeeds[i].topTenRank
              }
            }
          }
        );
      }
      
    }


  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
