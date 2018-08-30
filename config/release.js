/* eslint-env node */
const RSVP = require('rsvp');
const publisher = require('publish');

const start = RSVP.denodeify(publisher.start);
const publish = RSVP.denodeify(publisher.publish);

// For details on each option run `ember help release`
module.exports = {
  // local: true,
  // remote: 'some_remote',
  // annotation: "Release %@",
  // message: "Bumped version to %@",
  // manifest: [ 'package.json', 'bower.json', 'someconfig.json' ],
  // strategy: 'date',
  // format: 'YYYY-MM-DD',
  // timezone: 'America/Los_Angeles',
  //
  // beforeCommit: function(project, versions) {
  //   return new RSVP.Promise(function(resolve, reject) {
  //     // Do custom things here...
  //   });
  // }

  afterPush: function() {
    return start().then(function() {
      return publish({});
    });
  },
};
