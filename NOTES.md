const mongoCollection = require("@services/mongo-collection");

const usersCollection = await mongoCollection("users");
const users = await usersCollection?.find().toArray();

const bunniesCollection = await mongoCollection("bunnies");
const bunnies = await bunniesCollection?.find().toArray();

## 21/3/22

-   Working on adminauth - showing all users etc
-   edit other users
-   do we need an isAdmin function?
