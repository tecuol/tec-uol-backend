
export default {
  dialect: "mysql",
  database: process.env.DB_NAME || "tec_uol_db",
  port: parseInt(process.env.dbPort) || 3306,
  host: process.env.dbHost,
  // logging: console.log,
  logging: false,
  username: process.env.dbUser || 'root',
  password: process.env.dbPass || '',
  // models: [__dirname + "/models/"],
  // modelMatch: (filename, member) => {
  //   if(filename.includes('index')){
  //     return null
  //   }
  //   return (

  //     filename.substring(0, filename.indexOf(".model")) === member.toLowerCase() && !filename.includes('index')
  //   );
  // },
}
