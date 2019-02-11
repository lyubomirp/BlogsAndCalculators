function SingleDigit(leftOperand, operator) {

    this.leftOperand = Number(leftOperand);
    this.operator = operator;

    this.calculateSingleDigit = function () {
        let end = 0;

        switch (this.operator) {
            case "Sqrt":
                end = Math.sqrt(this.leftOperand);
                break;
            case "!":
                end = factoriel(this.leftOperand);
                break;
            case "loge":
                end = Math.log(this.leftOperand);
                break;
            case "log2":
                end = Math.log2(this.leftOperand);
                break;
            case "log10":
                end = Math.log10(this.leftOperand);
                break;
        }

        return end;
    }
}

function factoriel(digit) {
    if (digit>1){
        return digit * factoriel(digit-1);
    } else {
        return 1;
    }
}


module.exports = SingleDigit;