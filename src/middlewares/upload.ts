import multer from 'multer';

const storage = multer.memoryStorage(); // Store file in memory (avoids temporary file storage)
const upload = multer({ storage });

export default upload;
