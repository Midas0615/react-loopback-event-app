import { BaseAnimation } from 'animate-css-styled-components';
import styled, { css, keyframes } from 'styled-components'
 //create your custom animation
 const Rotate = keyframes`
   from { -webkit-transform: rotate(0deg); }
	  to { -webkit-transform: rotate(359deg); }
 `;


 //extend BaseAnimation component and create
 //your custom styled animation
 const LoadingRotator = styled(BaseAnimation)`
   animation-name: ${Rotate};
 `;

 //export your custom styled animation
 export default LoadingRotator;
