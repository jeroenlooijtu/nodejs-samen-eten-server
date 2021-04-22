module.exports = function(app){

    var studenthomes= require('../controllers/studenthomes.controller.js');



    app.post('/api/studenthome', studenthomes.create);

    app.get('/api/studenthome', studenthomes.gethomes);

    app.get('/api/studenthome/:homeId', studenthomes.getHomeById);

    app.put('/api/studenthome/:homeId', studenthomes.updateHome);

    app.delete('/api/studenthome/:homeid', studenthomes.deleteHome);

    app.put('/api/studenthome/:homeId/user', studenthomes.addUserToHome);


}