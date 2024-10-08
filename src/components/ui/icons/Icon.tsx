import React, {type FC, type ReactNode} from 'react';
import {type Source} from 'react-native-fast-image';

import {
  getIcon,
  type Icon as IconType,
} from '../../../../assets/constants/icons';
import {
  getImage,
  type Image as ImageType,
} from '../../../../assets/constants/images';

import {useTheme} from '../../../theme/theme-provider';

import {FastImage} from './FastImage';
import {VectorIcon, type VectorIconProps} from './VectorIcon';

export interface IconProps extends Omit<VectorIconProps, 'name'> {
  icon: IconType | ImageType | string;
  variant?: 'vector' | 'svg' | 'image';
}

export const Icon: FC<IconProps> = ({
  icon,
  variant = 'image',
  size = 7,
  color = 'black',
  ...rest
}) => {
  const theme = useTheme();

  const iconSize = theme.spacing[size as keyof typeof theme.spacing];
  const iconColor = theme.colors[color as keyof typeof theme.colors];

  const SvgComponent = getIcon(icon as IconType);
  const imageSource = getImage(icon as ImageType);

  const renderIcon = (): ReactNode => {
    switch (variant) {
      case 'vector':
        return <VectorIcon name={icon} size={size} color={color} {...rest} />;
      case 'svg':
        return (
          <SvgComponent
            color={iconColor}
            fontSize={iconSize}
            width={iconSize}
            height={iconSize}
          />
        );
      case 'image':
        return (
          <FastImage
            source={imageSource as Source}
            resizeMode="contain"
            width={iconSize}
            height={iconSize}
            {...rest}
          />
        );

      default:
        return <FastImage source={imageSource as Source} {...rest} />;
    }
  };

  return renderIcon();
};

export default Icon;
