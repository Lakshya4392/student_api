/**
 * Generates Fibonacci series up to n terms.
 * @param {number} n - Number of terms
 * @returns {number[]} - Array of Fibonacci numbers
 * @throws {Error} - If n is negative
 */
const getFibonacci = (n) => {
    if (typeof n !== 'number' || n < 0) {
        throw new Error("Invalid input: Fibonacci input must be a non-negative integer");
    }
    if (n === 0) return [];
    if (n === 1) return [0];
    
    const series = [0, 1];
    while (series.length < n) {
        const next = series[series.length - 1] + series[series.length - 2];
        series.push(next);
    }
    return series; // If n=2, returns [0, 1], matches expected [0, 1]
    // If n=7: [0, 1, 1, 2, 3, 5, 8] - Correct as per example
};

/**
 * Checks if a number is prime.
 * @param {number} num 
 * @returns {boolean}
 */
const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
};

/**
 * Filters prime numbers from an array.
 * @param {number[]} arr 
 * @returns {number[]} - Array of prime numbers
 */
const filterPrimes = (arr) => {
    if (!Array.isArray(arr)) throw new Error("Invalid input: Prime input must be an array");
    return arr.filter(num => typeof num === 'number' && isPrime(num));
};

/**
 * Calculates GCD of two numbers.
 */
const gcd = (a, b) => {
    return b === 0 ? a : gcd(b, a % b);
};

/**
 * Calculates HCF of an array of numbers.
 * @param {number[]} arr 
 * @returns {number}
 */
const getHCF = (arr) => {
    if (!Array.isArray(arr)) throw new Error("Invalid input: HCF input must be an array");
    if (arr.length === 0) throw new Error("Invalid input: HCF array cannot be empty");
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = gcd(result, arr[i]);
    }
    return result;
};

/**
 * Calculates LCM of two numbers.
 */
const lcm = (a, b) => {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
};

/**
 * Calculates LCM of an array of numbers.
 * @param {number[]} arr 
 * @returns {number}
 */
const getLCM = (arr) => {
    if (!Array.isArray(arr)) throw new Error("Invalid input: LCM input must be an array");
    if (arr.length === 0) throw new Error("Invalid input: LCM array cannot be empty");
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = lcm(result, arr[i]);
    }
    return result;
};

module.exports = {
    getFibonacci,
    filterPrimes,
    getHCF,
    getLCM
};
