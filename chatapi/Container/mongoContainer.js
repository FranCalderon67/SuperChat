const { MongoClient, ObjectId } = require('mongodb')

class MongoDbContainer {
    constructor(connection, db, collection) {
        this.mongo = new MongoClient(connection),
            this.db = db,
            this.collection = collection
    }

    async connectMongo() {
        try {
            await this.mongo.connect();
            console.log("MongoDB connected");
        } catch (error) {
            console.log("ERROR=>", error);
        }
    }

    async addItem(data) {
        try {
            await this.mongo.db(this.db).collection(this.collection).insertOne(data)
        } catch (error) {
            console.log("ERROR=>", error)
        }
    }

    async getAll() {
        try {
            const data = await this.mongo.db(this.db).collection(this.collection).find({}).toArray()
            return data
        } catch (error) {
            console.log("ERROR=>", error)
        }
    }

    async getUser(email) {
        try {
            const user = await this.mongo.db(this.db).collection(this.collection).findOne({ email: email })
            return user
        } catch (error) {
            console.log("ERROR=>", error)
        }
    }

}




module.exports = MongoDbContainer