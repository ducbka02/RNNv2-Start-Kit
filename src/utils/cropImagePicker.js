import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const isExistAvatar = (info) => {
    if (!info.image || info.image === '')
        return false;
    return true;
}

export const pickSingleBase64 = async (crop = true) => {
    await ImagePicker.clean();
    try {
        const image = await ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true,
            includeExif: true,
        });
        return `data:${image.mime};base64,` + image.data;
    } catch (e) {
        //alert(e);
        return null;
    }
}

export const cleanupImages = () => {
    ImagePicker.clean().then(() => {
        console.log('removed tmp images from tmp directory');
    }).catch(e => {
        alert(e);
    });
}

export const cleanupSingleImage = () => {
    let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
    console.log('will cleanup image', image);

    ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
        console.log(`removed tmp image ${image.uri} from tmp directory`);
    }).catch(e => {
        alert(e);
    })
}

export const pickSingle = (crop = true, circular = false) => {
    ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: crop,
        cropperCircleOverlay: circular,
        compressImageMaxWidth: 640,
        compressImageMaxHeight: 480,
        compressImageQuality: 0.5,
        compressVideoPreset: 'MediumQuality',
        includeExif: true,
    }).then(image => {
        console.log('received image', image);
        this.setState({
            image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
            images: null
        });
    }).catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
    });
}

export const pickSingleWithCamera = (cropping) => {
    ImagePicker.openCamera({
        cropping: cropping,
        width: 500,
        height: 500,
        includeExif: true,
    }).then(image => {
        //console.warn('received image', image);
    }).catch(e => alert(e));
}
