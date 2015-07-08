import crypto from 'crypto';

export default function (data) {
    var md5 = crypto.createHash('md5');

    md5.update(data);
    return md5.digest('hex');
}
