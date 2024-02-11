const log = {};

//log errs
log.err = (head, title, body) => {
    let toLog = `![${head?.toUpperCase()}] ${title}: ${body || ''} `;
    console.log(toLog);
}

//log status
log.log = (head, title) => {
    let toLog = `[${head?.toUpperCase()}] ${title}`;
    console.log(toLog);
}

module.exports = log;