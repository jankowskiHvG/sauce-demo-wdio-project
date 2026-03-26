class Logger{

    static verify(type, name) {
        console.log(`Test verifies ${type}: ${name}`);
    }
}

module.exports = Logger;