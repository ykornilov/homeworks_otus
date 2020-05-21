const atob = str => Buffer.from(str).toString('base64');

const btoa = base64str => Buffer.from(base64str, 'base64').toString();

module.exports = {
    atob,
    btoa,
};
