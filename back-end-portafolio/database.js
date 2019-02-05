const mongoose = require('mongoose');
const URi = 'mongodb://Alvava99:jH87xqFYZEJ5Pia@ds147975.mlab.com:47975/portafolios';
// mongodb://<dbuser>:<dbpassword>@ds123003.mlab.com:23003/foliosº

mongoose.connect(URi)
.then(db => console.log('Conexion exitosa'))
.catch(err => console.error(err));



module.exports = mongoose;