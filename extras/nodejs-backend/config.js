const config = {
    db: {
      /* don't expose password or any sensitive info, done only for testing */
      host: "db4free.net",
      user: "restapitest123",
      password: "restapitest123",
      database: "restapitest123",
    },
    listPerPage: 10,
    mailServer : {
      service: 'gmail',
      auth: {
        user : 'nkukna12345@gmail.com',
        pass : 'muqiisclpbfyqjwd'
      }
    },
    directoryPath: "static/assets"
  };
  
  module.exports = config;
  