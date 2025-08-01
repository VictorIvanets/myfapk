// import { useState } from 'react';
// import Base from 'src/components/Input/components/Base';
// import SvgIcon from 'src/components/SvgIcon';
// import { icons } from 'src/theme/icons';
// import type { InputProps } from 'src/components/Input/types';

// const eyeIcon = icons['eye-24'];
// const eyeOffIcon = icons['eye-off-24'];

// type InputPasswordProps = Omit<
//   InputProps,
//   'secureTextEntry' | 'endIcons' | 'keyboardType'
// >;

// const Password = ({ ...props }: InputPasswordProps): JSX.Element => {
//   const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

//   const togglePasswordVisibility = () => setIsPasswordHidden(prev => !prev);

//   return (
//     <Base
//       {...props}
//       secureTextEntry={isPasswordHidden}
//       textContentType="oneTimeCode"
//       keyboardType="default"
//       endIcons={[
//         {
//           icon: <SvgIcon icon={isPasswordHidden ? eyeIcon : eyeOffIcon} />,
//           onPress: togglePasswordVisibility,
//         },
//       ]}
//     />
//   );
// };

// export default Password;
