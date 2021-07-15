const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const sizeAvatar = {
  width: '40',
  height: '44',
};

const sizePhoto = {
  width: '70',
  height: '70',
};

const fieldChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const uploadPhoto = (fileChooser, preview, width, height) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
        preview.width = width;
        preview.height = height;
      });

      reader.readAsDataURL(file);
    }
  });
};

uploadPhoto(fieldChooser, avatarPreview, sizeAvatar.width, sizeAvatar.height);

const removeAvatar = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
};

const fileUpload = document.querySelector('.ad-form__upload input[type=file]');
const photoContainer = document.querySelector('.ad-form__photo');
const photoPreview = document.createElement('img');
photoContainer.appendChild(photoPreview);

uploadPhoto(fileUpload, photoPreview, sizePhoto.width, sizePhoto.height);

const removePhoto = () => {
  photoPreview.src = '';
  photoPreview.width = '0';
  photoPreview.height = '0';
};

export {removeAvatar, removePhoto};
