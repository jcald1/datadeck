import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const getSosCaOutputXlsxReadStream = async newCwd => new Promise(resolve => {
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error('No XLSX Output File', err);
                return resolve(null);
            }

            const outputPath = path.resolve(newCwd, process.env.services.sosCa.outputFileName);
            console.log('XLSX Output File Detected', outputPath);
            resolve(fs.createReadStream(outputPath));
        });
    });

/*
    returns {
        err,
        stdout,
        stderr,
        fileStream
    }
 */
const callSosCa = async (inputFilePath) => {
    const ddpkgCwd =  path.resolve(process.cwd(), '../ddpkg', 'sosCa');
    const cmd = process.env.services.sosCa.cmd.join(' ') + ' ' + path.resolve(ddpkgCwd, process.env.services.sosCa.goFile);
    const newCwd = path.dirname(inputFilePath);
    process.chdir(newCwd);

    console.log('Executing SOS CA', { cmd, newCwd, inputFilePath });

    await soscaResult = new Promise((resolve) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.error(`exec error: ${err}`);
                console.error(`Standard Out: ${stdout} Standard Err: ${stderr}`);
                return resolve({
                    err,
                    stdout,
                    stderr
                });
            }

            console.log(`Standard Out: ${stdout} Standard Err: ${stderr}`);
            resolve({ err: null, stdout, stderr})
        });
    });

    return {
        ...soscaResult,
        fileStream: await getSosCaOutputXlsxReadStream(newCwd)
    }
};

export default {
    callSosCa,
}