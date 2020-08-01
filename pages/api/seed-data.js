const fs = require('fs');
const {serializeError } = require('serialize-error');
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');

// Disable the JSON body parser so we get a stream
export const config = {
  api: {
    bodyParser: false,
  },
};

const sendJsonResponse = (req, res, code, data) => {
  if (res.headersSent) {
    return console.error('Response headers already sent.  Will not attempt to re-send response', data);
  }
  res.status(code).json(data);
};

const ensureDirExists = async targetDir => fs.promises.mkdir(targetDir, { recursive: true });

export default async (req, res) => {
  const uuid = uuidv4();

  const uploadDir = `/tmp/dataDeck/seedData/${uuid}`;
  await ensureDirExists(uploadDir);

  return new Promise(resolve => {
    const form = new formidable.IncomingForm({uploadDir});
    form.parse(req, async (err, fields, files) => {
          try {
            if (err) {
              const wrappedErr = {msg: 'Error reading posted file', err: serializeError(err)};
              console.error(wrappedErr);
              sendJsonResponse(req, res, 500, wrappedErr);
              resolve();
            }

            console.log('Finished parsing file', {fullPath: files.file.path, originalFilename: files.file.name, uuid});

            // TODO: Call SOS CA
            //console.log('Calling SOS CA');
            //console.log('Finished Calling SOS CA.  Returning response');

            await fs.promises.unlink(files.file.path);
            const msg = {status: 'success', uuid};
            sendJsonResponse(req, res, 200, msg);
            resolve();
          }
          catch (err) {
            const wrappedErr = {msg: 'Unhandled error reading posted file', err: serializeError(err)};
            console.error(wrappedErr);
            sendJsonResponse(req, res, 500, wrappedErr);
            resolve();
          }
        }
    )
  });
}