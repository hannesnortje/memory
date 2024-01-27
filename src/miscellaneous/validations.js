const validations = {
    checkDeckSize: (num, min = 1, max = 54)=> {
        return (num % 2 !== 0 || num < min || num > max);
    }
}

export default validations;