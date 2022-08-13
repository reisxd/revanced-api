import { MongoClient } from "mongodb";

class MongoDBClient {
    constructor(url) {
        this.client = new MongoClient(url);
        this.client.connect();
        this.db = this.client.db('api');
    }

    async getContributors() {
       const contributors = await this.db.collection('contributors').find({}).toArray();

       return contributors;
    }

    async writeContributors(repo, contributors) {
        // NOTE: this won't work if theres no object in the collection.
        await this.db.collection('contributors').updateOne({ repo }, { $set: { contributors } });

        return;
    }

    // TODO: do announcements (if required)
}

export default MongoDBClient;