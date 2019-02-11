function converter(leftOperand, fromOperator, toOperator) {

    this.leftOperand = leftOperand;

    this.fromOperator = fromOperator;
    this.toOperator = toOperator;


    this.calculateResult = function () {
        let end = Number.MIN_VALUE;

        if (this.fromOperator === 'fromMeter'){
            switch (this.toOperator) {
                case "toMeter":
                    end = this.leftOperand * 1;
                    break;
                case "toFoot":
                    end = this.leftOperand * 3.28084;
                    break;
                case "toInch":
                    end = this.leftOperand * 39.3701;
                    break;
            }
        } else if (this.fromOperator === 'fromFoot') {
            switch (this.toOperator) {
                case "toMeter":
                    end = this.leftOperand * 0.3048;
                    break;
                case "toFoot":
                    end = this.leftOperand * 1;
                    break;
                case "toInch":
                    end = this.leftOperand * 12;
                    break;
            }
        } else if (this.fromOperator === 'fromInch') {
            switch (this.toOperator) {
                case "toMeter":
                    end = this.leftOperand * 0.0254;
                    break;
                case "toFoot":
                    end = this.leftOperand * 0.0833333;
                    break;
                case "toInch":
                    end = this.leftOperand * 1;
                    break;
            }
        }  else if (this.fromOperator === 'fromKilogram') {
            switch (this.toOperator) {
                case "toKilogram":
                    end = this.leftOperand * 1;
                    break;
                case "toStone":
                    end = this.leftOperand * 0.157473;
                    break;
                case "toOunce":
                    end = this.leftOperand * 35.274;
                    break;
            }
        } else if (this.fromOperator === 'fromStone') {
            switch (this.toOperator) {
                case "toKilogram":
                    end = this.leftOperand * 6.35029;
                    break;
                case "toStone":
                    end = this.leftOperand * 1;
                    break;
                case "toOunce":
                    end = this.leftOperand * 224;
                    break;
            }
        }else if (this.fromOperator === 'fromOunce') {
            switch (this.toOperator) {
                case "toKilogram":
                    end = this.leftOperand * 0.453592;
                    break;
                case "toStone":
                    end = this.leftOperand * 0.00446429;
                    break;
                case "toOunce":
                    end = this.leftOperand * 1;
                    break;
            }
        }
        if (end===Number.MIN_VALUE){
            return end = "Incompatible conversion.";
        } else {
            return end;
        }
    }

}

module.exports = converter;