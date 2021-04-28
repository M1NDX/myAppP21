console.log(process.env.DB_USER);
console.log(process.env.DB_PWD);

module.exports = {
    db_user: process.env.DB_USER,
    password: process.env.DB_PWD,
    db_name: 'mydb',
    getUrl() {
       return `mongodb+srv://${this.db_user}:${this.password}@cluster0.vleah.mongodb.net/${this.db_name}?retryWrites=true&w=majority`
   }
}