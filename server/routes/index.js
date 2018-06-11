const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  //app.get('/api/trial/:userid/:pswd', usersController.check, usersController.list);
  app.get('/api/list',usersController.list);
  app.post('/api/users', usersController.create);
  app.get('/api/users/:userid/pswd/:pswd',usersController.check, usersController.login);
  app.put('/api/users/:userid/pswd/:pswd',usersController.check, usersController.update);
};