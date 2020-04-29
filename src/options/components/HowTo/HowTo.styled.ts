import styled from '@emotion/styled';

export const Ol = styled.ol`
  margin: 0;
  padding: 0;
  list-style-type: none;
  counter-reset: list;

  li {
    margin-bottom: 0.25em;

    &:last-child {
      margin-bottom: 0;
    }

    &::before {
      counter-increment: list;
      content: counter(list) '. ';
    }
  }
`;
