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

    async sendMessage(data) {
        try {
            await this.mongo.db(this.db).collection(this.collection).insertOne(data)
        } catch (error) {
            console.log("ERROR=>", error)
        }
    }

    async getMessage() {
        try {
            const data = await this.mongo.db(this.db).collection(this.collection).find({}).toArray()
            return data
        } catch (error) {
            console.log("ERROR=>", error)
        }
    }

}




module.exports = MongoDbContainer