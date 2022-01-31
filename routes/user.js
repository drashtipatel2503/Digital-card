const express = require ('express'); 
const router = express.Router(); 
const User = require('../model/user'); 

router.get('/', function(req, res) { 
    console.log('get')
    User.find(function(err, users) {
    res.json(users);
    console.log(users,err)
  });
});

 router.get('/user/:id', function(req, res) {  
     User.findById(req.params.id, function(err, user) {
     if (!user) {
       res.status(404).send('No result found');
     } else {
       res.json(user);
     }
   });
 });

router.post('/', function(req, res) {     
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.send(user);
    })
    .catch(function(err) {
      console.log(err,'err')
      res.status(422).send('user add failed');
    });
});

 router.patch('/user/:id', function(req, res){    
   User.findByIdAndUpdate(req.params.id, req.body)
     .then(function() {
       //add json
       res.json('User updated');
     })
     .catch(function(err) {
       res.status(422).send("update failed.");
     });
 });

 router.delete('/user/:id', function(req, res) {  
   User.findById(req.params.id, function(err, user) {
     if (!user) {
       res.status(404).send('user not found');
     } else {
      User.findByIdAndRemove(req.params.id)
         .then(function() { res.status(200).json("user deleted") })
         .catch(function(err) {
           res.status(400).send("user delete failed.");
         })
     }
   });
 })

module.exports = router; 