const homeController = require('./../controllers/home');
const singleDigController = require('./../controllers/singleDigController');
const converterController = require('./../controllers/ConverterController');

module.exports = (app) => {
    app.get('/', homeController.indexGet);
    app.post('/', homeController.indexPost);

    app.get('/singleDigit.hbs', singleDigController.singleDigitGet);
    app.post('/singleDigit.hbs', singleDigController.singleDigitPost);

    app.get('/converter.hbs', converterController.ConverterGet);
    app.post('/converter.hbs', converterController.ConverterPost);
};


