const express = require ('express'); 
const router = express.Router(); 
const Service = require('../model/service'); 
const User = require('../model/user'); 


const addservicetoprofile = p =>{
  console.log(p,'p')
  uid =  '61f41ea9324d693d06c8eaa7'
  User.findOne({_id: uid}, function(err, user) {
         console.log(user,'jsdhfk')
         if (!user) {
           console.log(err)
         } else {
           var g = json(user)
           console.log(g)
           //res.json(article);
         }
       });
}
router.get('/', function(req, res) { 
    console.log('get')
    Service.find(function(err, service) {
    res.json(service);
    console.log(service,err)
  });
});
//search by id
 router.get('/service/:id', function(req, res) {  
     Service.findById(req.params.id, function(err, service) {
     if (!service) {
       res.status(404).send('No result found');
     } else {
       res.json(service);
     }
   });
 });
//add
router.post('/', function(req, res) {     
  let service = new Service(req.body);
  service.save()
    .then(service => {
      res.send(service);
      console.log(service._id)
      addservicetoprofile(service._id)
    })
    .catch(function(err) {
      console.log(err,'err')
      res.status(422).send('service add failed');
    });
});
//update services
 router.patch('/service/:id', function(req, res){    
   Service.findByIdAndUpdate(req.params.id, req.body)
     .then(function() {
       res.json('updated');
     })
     .catch(function(err) {
       res.status(422).send("update failed.");
     });
 });

 router.delete('/service/:id', function(req, res) {  
    Service.findById(req.params.id, function(err, service) {
     if (!service) {
       res.status(404).send('Service not found');
     } else {
        Service.findByIdAndRemove(req.params.id)
         .then(function() { res.status(200).json("Service deleted") })
         .catch(function(err) {
          res.status(400).send("service delete failed.");
        })
    }
   });
 })

module.exports = router; 