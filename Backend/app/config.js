const config = {
    port: process.env.PORT || 3001,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://arekimmobile_db_user:<db_password>@galleryapp.kjn0kkn.mongodb.net/?appName=galleryApp',
    JwtSecret: process.env.JWT_SECRET || 'secret'
};
export default config;

