const mongoose = require('mongoose');
const URi = 'mongodb://localhost/Portafolios';
// mongodb://<dbuser>:<dbpassword>@ds123003.mlab.com:23003/foliosº

mongoose.connect(URi)
.then(db => console.log('Conexion exitosa'))
.catch(err => console.error(err));



module.exports = mongoose;