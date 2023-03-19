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

export const YTIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 560/350;
  height: auto;
  margin-top: 1rem;
`;
