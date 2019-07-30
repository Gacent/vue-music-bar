import EXIF from 'exif-js'

export default {
  getImageFile(file) {
    return  new Promise((resolve, reject) => {
      EXIF.getData(file, function () {
        let tags = EXIF.getAllTags(this);
        let orientation = EXIF.getTag(this, 'Orientation');
        if (!orientation) {
          if (orientation === 6) {
            // 旋转90度
0
          }
        } else {
          resolve(file);
        }
      })
    });
  },
  /**
   * 旋转图片
   * @param file
   * @param degree
   */
  rotateImage(file, degree) {

  }
}
