const multer = require('multer');
const AppError = require('./AppError');

const upload = multer({
  limits: {
    fileSize: 4000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(
        new AppError(
          'Only supports image format. Please upload image file. If you are uploading an image file and getting an error then please try to rename your file. ',
          400
        )
      );
    }

    cb(undefined, true);
  }
});

module.exports = upload;
