const Converter = require('../Models/ConverterLogic.js');


module.exports = {

    ConverterGet: (req, res) => {
        res.render('home/converter');
    },

    ConverterPost: (req, res)=>{
        let body = req.body;

        let params = body["calculator"];

        let converterMath = new Converter();

        converterMath.leftOperand = params.leftOperand;
        converterMath.fromOperator = params.fromOperator;
        converterMath.toOperator = params.toOperator;

        let end = converterMath.calculateResult();

        res.render('home/converter', {'calculator':converterMath, 'result': end});
    }

};