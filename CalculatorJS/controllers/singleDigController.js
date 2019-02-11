const SingleDigit = require('../Models/SingleDigitLogic.js');


module.exports = {

    singleDigitGet: (req, res) => {
        res.render('home/singleDigit');
    },

    singleDigitPost: (req, res)=>{
        let body = req.body;

        let params = body["calculator"];

        let singleDigitCalc = new SingleDigit();

        singleDigitCalc.leftOperand = params.leftOperand;
        singleDigitCalc.operator = params.operator;

        let end = singleDigitCalc.calculateSingleDigit();

        res.render('home/singleDigit', {'calculator':singleDigitCalc, 'result': end});
    }

};