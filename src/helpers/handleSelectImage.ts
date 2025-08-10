import type {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export const handleSelectImage = async (
  launchFunction: typeof launchImageLibrary | typeof launchCamera,
) => {
  try {
    const image = await launchFunction({
      mediaType: 'photo',
    });

    if (image.didCancel) return;

    const [selectedImage] = image.assets || [];

    const imageFile = {
      uri: selectedImage?.uri || '',
      type: selectedImage?.type || '',
      name: selectedImage?.fileName || '',
      fileSize: selectedImage?.fileSize || 0,
    };

    return imageFile;
  } catch (error) {
    console.log(error);
  }
};

export const convertObjectFileToFormData = (obj: object): FormData => {
  const formData = new FormData();

  formData.append('file', obj as unknown as string);

  return formData;
};
