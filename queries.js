// ==========================
// INSERT DOCUMENTS
// ==========================

db.movies.insertOne({
    title: "Star Wars",
    writer: "George Lucas",
    year: 1977,
    actors: [
        "Mark Hamill",
        "Harrison Ford",
        "Carrie Fisher",
        "Peter Cushing",
        "James Earl Jones"
    ]
})

db.movies.insertOne({
    title: "Raiders of the Lost Ark",
    writer: "George Lucas",
    year: 1981,
    actors: ["Harrison Ford"]
})

db.movies.insertOne({
    title: "Fight Club",
    writer: "Chuck Palahniuk",
    year: 1999,
    actors: ["Brad Pitt", "Edward Norton"]
})

db.movies.insertOne({
    title: "Pulp Fiction",
    writer: "Quentin Tarantino",
    year: 1994,
    actors: ["John Travolta", "Uma Thurman"]
})

db.movies.insertOne({
    title: "Inglorious Basterds",
    writer: "Quentin Tarantino",
    year: 2009,
    actors: ["Brad Pitt", "Diane Kruger", "Eli Roth"]
})

db.movies.insertOne({
    title: "The Hobbit: An Unexpected Journey",
    writer: "J.R.R. Tolkien",
    year: 2012,
    franchise: "The Hobbit"
})

db.movies.insertOne({
    title: "The Hobbit: The Desolation of Smaug",
    writer: "J.R.R. Tolkien",
    year: 2013,
    franchise: "The Hobbit"
})

db.movies.insertOne({
    title: "The Hobbit: The Desolation of Smaug",
    writer: "J.R.R. Tolkien",
    year: 2013,
    franchise: "The Hobbit"
})

db.movies.insertOne({
    title: "Pee Wee Herman's Big Adventure",
    writer: "Phil Hartman",
    year: 1985
})

db.movies.insertOne({
    title: "Avatar"
})

// ==========================
// QUERY / FIND DOCUMENTS
// ==========================
db.movies.find({})

db.movies.find({ writer: "Quentin Tarantino" })

db.movies.find({ actors: "Brad Pitt" })

db.movies.find({ franchise: "The Hobbit" })

db.movies.find({
    year: {
        $gte: 1990,
        $lte: 1999
    }
})

db.movies.find({
    $or: [
        { year: { $lt: 2000 } },
        { year: { $gt: 2010 } }
    ]
})

// ==========================
// UPDATE DOCUMENTS
// ==========================
db.movies.updateOne(
    { title: "The Hobbit: An Unexpected Journey" },
    {
        $set: {
            synopsis: "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."
        }
    }
)

db.movies.updateOne(
    { title: "The Hobbit: The Desolation of Smaug" },
    {
        $set: {
            synopsis: "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."
        }
    }
)

db.movies.updateOne(
    { title: "Pulp Fiction" },
    {
        $push: {
            actors: "Samuel L. Jackson"
        }
    }
)

// ==========================
// TEXT SEARCH
// ==========================
db.movies.createIndex({ synopsis: "text" })

db.movies.find({
    $text: { $search: "Bilbo" }
})

db.movies.find({
    $text: { $search: "Gandalf" }
})

db.movies.find({
    $text: { $search: "Bilbo -Gandalf" }
})

db.movies.find({
    $text: { $search: "dwarves hobbit" }
})

db.movies.find({
    $and: [
        { $text: { $search: "gold dragon" } },
        { synopsis: { $regex: "gold", $options: "i" } },
        { synopsis: { $regex: "dragon", $options: "i" } }
    ]
})

// ==========================
// DELETE DOCUMENTS
// ==========================

db.movies.deleteOne({
    title: "Pee Wee Herman's Big Adventure"
})

db.movies.deleteOne({
    title: "Avatar"
})

// ==========================
// RELATIONSHIPS
// ==========================

db.users.insertOne({
    username: "SallySmith",
    first_name: "Sally",
    last_name: "Smith"
})

db.users.insertOne({
    username: "JimmyHagen",
    full_name: {
        first: "Jimmy",
        last: "Hagen"
    }
})

db.posts.insertOne({
    username: "SallySmith",
    title: "Passes out at party",
    body: "Wakes up early and cleans house"
})

db.posts.insertOne({
    username: "SallySmith",
    title: "Buys a House",
    body: "Living in a new neighborhood now"
})

db.posts.insertOne({
    username: "SallySmith",
    title: "Reports a bug in your code",
    body: "Sends you a Pull Request"
})

db.posts.insertOne({
    username: "JimmyHagen",
    title: "Borrows something",
    body: "Returns it when he is done"
})

db.posts.insertOne({
    username: "JimmyHagen",
    title: "Borrows everything",
    body: "The end"
})

db.posts.insertOne({
    username: "JimmyHagen",
    title: "Forks your repo on github",
    body: "Sets to private"
})

db.posts.findOne({ title: "Borrows something" })
db.comments.insertOne({
    username: "SallySmith",
    comment: "Hope you got a good deal!",
    post: ObjectId("6a8625507198e35f409c8a17")
})

db.posts.findOne({ title: "Borrows everything" })
db.comments.insertOne({
    username: "SallySmith",
    comment: "What's mine is yours!",
    post: ObjectId("6a86255c7198e35f409c8a18")
})

db.posts.findOne({ title: "Forks your repo on github" })
db.comments.insertOne({
    username: "SallySmith",
    comment: "Don't violate the licensing agreement!",
    post: ObjectId("6a8625697198e35f409c8a19")
})

db.posts.findOne({ title: "Passes out at party" })
db.comments.insertOne({
    username: "JimmyHagen",
    comment: "It still isn't clean",
    post: ObjectId("6a86250b7198e35f409c8a14")
})

db.posts.findOne({ title: "Reports a bug in your code" })
db.comments.insertOne({
    username: "JimmyHagen",
    comment: "Denied your PR cause I found a hack",
    post: ObjectId("6a86253a7198e35f409c8a16")
})

// ==========================
// QUERYING RELATED COLLECTIONS
// ==========================
db.users.find({})

db.posts.find({})

db.posts.find({ username: "SallySmith" })

db.posts.find({ username: "JimmyHagen" })

db.comments.find({})

db.comments.find({ username: "SallySmith" })

db.comments.find({ username: "JimmyHagen" })

db.posts.findOne({ title: "Reports a bug in your code" })
db.comments.find({
    post: ObjectId("6a86253a7198e35f409c8a16")
})