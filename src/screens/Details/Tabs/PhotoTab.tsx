import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import type { TabProps } from './types';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import useGetPhotoInFolder from 'src/hooks/useGetPhotoInFolder';
import type { ResponseGetPhoto } from 'src/types/photo.types';
import { colors } from 'src/theme/colors';
import useGetUserInfoInStorage from 'src/hooks/useGetUserInfoInStorage';
import { ScrollView } from 'react-native-gesture-handler';
import PhotoItem from 'src/components/PhotoItem/PhotoItem';
import ScaleInPressable from 'src/components/ScaleInPressable';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { handleSelectImage } from 'src/helpers/handleSelectImage';
import { launchImageLibrary } from 'react-native-image-picker';
import FormData from 'form-data';
import useUploadPhoto from 'src/hooks/useUploadPhoto';

const PhotoTab = ({ data }: TabProps) => {
  const user = useGetUserInfoInStorage();
  const [timeruploadPhoto, setTimerUploadPhoto] = useState<
    ResponseGetPhoto[] | undefined
  >();
  const { photoData, isLoadingPhoto } = useGetPhotoInFolder(data?._id);
  const { uploadPhoto } = useUploadPhoto(data?._id || '');
  const [errorUpload, setErrorUpload] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setTimerUploadPhoto(photoData);
    }, 500);
  }, [photoData]);

  const takeImageFromGallery = async () => {
    const imageFile = await handleSelectImage(launchImageLibrary);
    const formData = new FormData();
    if (imageFile) {
      if (imageFile.type !== 'image/jpeg' && imageFile.type !== 'image/png') {
        setErrorUpload('Файл має бути у форматі JPEG або PNG');
        return;
      }
      formData.append('files', imageFile);
      data && uploadPhoto({ _id: data?._id, formData });
    }
  };

  return (
    <Flex rel style={styles.container}>
      {timeruploadPhoto?.length && data ? (
        <ScrollView contentContainerStyle={styles.photoboxContentContainer}>
          {timeruploadPhoto.map(item => (
            <PhotoItem key={item._id} item={item} data={data} />
          ))}
        </ScrollView>
      ) : isLoadingPhoto ? (
        <ActivityIndicator size={150} color={colors.ACCENT} />
      ) : (
        <Flex center flex>
          {user?._id === data?.userId ? (
            <ScaleInPressable onPress={takeImageFromGallery}>
              <Flex center>
                <Text center color="TEXTDARK">
                  Ще немає фото.
                  {'\n'}
                  Натисніть щоб загрузити свой фото,
                  {'\n'}
                  для цієї рибалки
                </Text>
              </Flex>
            </ScaleInPressable>
          ) : (
            <Flex center>
              <Text>Автор ще не додав сюди фото</Text>
            </Flex>
          )}
        </Flex>
      )}
      {user?._id === data?.userId && (
        <ScaleInPressable
          onPress={takeImageFromGallery}
          style={styles.addphoto}
        >
          <MaterialIcons
            name="add-photo-alternate"
            size={50}
            color={colors.ACCENT}
          />
        </ScaleInPressable>
      )}
      {errorUpload && (
        <ScaleInPressable
          onPress={() => setErrorUpload(null)}
          style={styles.error}
        >
          <Text color="RED" size="Bh4">
            {errorUpload}
          </Text>
        </ScaleInPressable>
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  photoboxContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  addphoto: {
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  error: {
    position: 'absolute',
    backgroundColor: colors.SECOND50,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhotoTab;
