import styled from '@emotion/styled';

export const Li = styled.li`
  margin-bottom: 0.5rem;
`;

export const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  & > ${Li}:last-of-type {
    margin-bottom: 0;
  }
`;
