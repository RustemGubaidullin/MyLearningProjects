//Binomial expansion проходит тесты Codewars

const primerRazbor = {
    znakFirst:'',
    operandFirst:'',
    operandNeizv:'',
    operator:'',
    operandSecond:'',
    stepen:Number
}

//Factorial counter
function fact(num){
    if (num == 0) {return result = 1}
    else {return result = [...Array(num).keys()].map(i => i+1).reduce((acc, val) => acc * val)}
}

//Main expansion function
function expand (str){

    const strInspect = str.toLowerCase()
    let index = []
    let result = ''
    let iteration = ''
 
    //Finding index of unknown 
    for (i=0; i<strInspect.length; i++){
        if (strInspect[i].match(/[a-z]/)){
            index.push(i)
        }
    }
    //Finding index of the last brace
    const index2 = strInspect.indexOf(')')


    //Slicing string into variables
    let znakFirst = strInspect[1].match('-')? primerRazbor.znakFirst = '-' : primerRazbor.znakFirst = '+'
    let operandFirst = strInspect.slice(1, index[0]) == 0 ? primerRazbor.operandFirst = 1 : primerRazbor.operandFirst = strInspect.slice(1, index[0])
        if (operandFirst == znakFirst)
            operandFirst = -1
    let operandNeizv = primerRazbor.operandNeizv = strInspect[index[0]]
    let operandSecond = strInspect[index[0]].match('-') ? primerRazbor.operandSecond = +strInspect.slice(index[0]+1, index2) * -1 : primerRazbor.operandSecond = +strInspect.slice(index[0]+1, index2)
    let stepen = primerRazbor.stepen = +strInspect.slice(index2+2)
        if (znakFirst == '-' && operandFirst > 1) {
            operandFirst = operandFirst*(-1)
        } else {
            operandFirst = operandFirst
        } 
    
    //First case: if second operand equals 0
    if (operandSecond == 0) {result = `${Math.pow(operandFirst, stepen)}${operandNeizv}^${stepen}`
     
    }
    else {
        //Iterating and adding counted result to variable(according to Binomial Expansion Formula: (x + a)^n = nCr*x^n-r*a^r)
        for (i=stepen, j=0, k=stepen+1; k>0; k--, i--, j++){

            //Calculating current Binomial coefficient
            let coeff = fact(stepen) / (fact(i) * fact((stepen) - i))
            //Calculating current number before unknown
            let calculatedNumbers = `${coeff*Math.pow(operandFirst, i)*Math.pow(operandSecond, j)}`
            
            iteration = `${calculatedNumbers}${operandNeizv}^${i}`
            
            
            //Cleaning our current iteration to recieve classic view of solution
            if (i<=stepen && i != 0) iteration+='+'
            if (i < 10) iteration = iteration.replace(`^1`, ``)
            iteration = iteration.replace('*1+', '+').replace(`${operandNeizv}^0`, '').replace('**', '*')
            if (calculatedNumbers == '1' || (calculatedNumbers.length == 2 && calculatedNumbers[0] == '-')) iteration = iteration.replace(`1${operandNeizv}`, `${operandNeizv}`)
            //Pushing iteration to result
            result += iteration
            //Cleaning result
            result = result.replace('+-', '-')
            
        }
    }

return console.log(result)
}
//Testing
expand('(-11z-13)^5')
