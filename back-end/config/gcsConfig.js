const fs = require('fs');
const path = require('path');
const gTokenPath = path.join(`${__dirname}/gcsToken.json`);

function config(){
    fs.writeFileSync(gTokenPath, process.env.GCS_JSON_TOKEN);
    
    const gcsKeyFile = JSON.parse(process.env.GCS_JSON_TOKEN);
    
    const config = {
        projectId: gcsKeyFile.project_id,
        keyFilename: gTokenPath,
    };
    return config;
}

module.exports = config;