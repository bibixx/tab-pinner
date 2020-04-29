import styled from '@emotion/styled';

const Ol = styled.ol`
  margin: 0;
  margin-bottom: 0.5rem;
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

export default Ol;
