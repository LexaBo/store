import noPhotoImage from "~/assets/images/common/no_image.png";

export const handleImageLoadError = (event: Event) => {
    const element = event.target as HTMLImageElement;
    element.src = noPhotoImage;
};
