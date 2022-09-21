const fs = require('fs')


function writeDataToFile(path, content) {
    try {

        fs.writeFile(path, JSON.stringify(content), 'utf-8', err => {
            if (err)
                console.log(err)
        })
    } catch (error) {
        return error
    }

}

function getRequestBody(req) {
    return new Promise((resolve, reject) => {
       try{
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {            
            resolve(body)
        });
    }
    catch(err){
        reject(err)
    }
    })
}


module.exports = {
    writeDataToFile,
    getRequestBody
}