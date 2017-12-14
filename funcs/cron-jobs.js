const { Event } = require('klasa');
const Cron = require('node-cron');
const path = require('path');
const antiSpamDecay = require(path.resolve(__dirname, "./anti-spam-decay.js"));
const roleChecks = require(path.resolve(__dirname, "./roleChecks.js"));

module.exports = {
    init(client) {

        var antispam = Cron.schedule('*/10 * * * * *', () => {
            antiSpamDecay.run();
        });
        var roleCheck = Cron.schedule('*/10 * * * * *', () => {
            roleChecks.run(client);
        });
    },

    stop(job) {
        //todo
    },

    start(job) {
        //todo
    },

    restart(job) {
        //todo
    }
}