import styled from '@emotion/styled';

const VisuallyHidden = styled.div`
  position: absolute;
  opacity: 0.0000001;
`;

export const VisuallyHiddenLabel = VisuallyHidden.withComponent('label');

export default VisuallyHidden;
