const User = require('../models').User;

module.exports = {
  create(req, res) {
    //console.log(req.body);
    return User
      .create({
        firstname: req.body.first,
        lastname: req.body.last,
        password: req.body.pswd,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },

  check(req,res,next){
    return User
    .findById(req.params.userid)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      else if(todo.password === req.params.pswd){
        req.p=todo.id;
        console.log('Everything is fine');
        next();
      }
      else if(todo.password !== req.params.pswd){
        return res.status(200).send({
          message: 'Incorrect password '+ todo.firstname,
        });
      }
    })
    .catch(error => res.status(400).send(error));
  },

  list(req, res) {
  return User
    .all()
    .then(todos => res.status(200).send(todos))
    .catch(error => res.status(400).send(error));
},

  login(req, res) {
    console.log('Password here: ', req.p);
    // res.status(200).send({
    //        message: 'You have successfully logged in ',
    //     });
     return User
    .findById(req.p)
    .then(todo => {
      return res.send({
        message: 'You have successfully logged in '+ todo.firstname, 
      })
    })
    .catch(error => res.status(400).send(error));
  },
update(req, res) {
  return User
    .findById(req.p)
    .then(todo => {
      return todo
        .update(req.body, {fields: Object.keys(req.body)})
        .then(() => res.status(200).send(todo))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
};