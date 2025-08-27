const config = {
    port: process.env.PORT || 3001,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://zi_projekt:L7izN7BEN59yVoN1@zicluster.hic5b.mongodb.net/?retryWrites=true&w=majority&appName=ZICluster',
    JwtSecret: process.env.JWT_SECRET || 'secret'
};
export default config;