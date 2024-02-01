module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri:
          "mongodb://deepakh:dlms00@cluster0-shard-00-00.tx2wg.gcp.mongodb.net:27017,cluster0-shard-00-01.tx2wg.gcp.mongodb.net:27017,cluster0-shard-00-02.tx2wg.gcp.mongodb.net:27017/ecell?ssl=true&replicaSet=atlas-k6rqz8-shard-0&authSource=admin&retryWrites=true&w=majority",
      },
      options: {
        ssl: true,
      },
    },
  },
});
