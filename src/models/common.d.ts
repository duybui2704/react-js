import { CropRect } from 'react-native-image-crop-picker';

export type ItemProps = {
    value?: string;
    text?: string;
    id?: string;
    icon?: string;
    link?: string;
};

export type Image = {
    CropRect: CropRect | undefined;
    path?: string | undefined;
    size: number | undefined;
    width: number | undefined;
    height: number | undefined;
    mime: string | undefined;
    filename: string | undefined;
    creationDate: string | undefined;
    modificationDate?: string | undefined;
    sourceURL: string | undefined;
    localIdentifier?: string | undefined;
    exif: object | undefined;
    uri: string | undefined;
    type: string | undefined;
    name: string | undefined;
};

export type UpLoadImageModel = {
    images: Array<Image> | undefined;
    code: number | undefined;
};
