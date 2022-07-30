import { KeyboardEvent, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import ReactModal from 'react-modal';
import { ClassNames } from '@emotion/react';

import { Button } from '../Button/Button';
import {
  Wrapper, Body, Header, Footer, StyledH2,
} from './Modal.styled';

interface ModalProps {
  isOpen: boolean;
  onClose: (event: ReactMouseEvent<Element, MouseEvent> | KeyboardEvent<Element>) => void;
  header?: string;
  acceptButtonText: string;
  children: ReactNode;
}

export const Modal = ({
  isOpen, onClose, children, header, acceptButtonText,
}: ModalProps) => {
  const { matches: prefersReducedMotion } = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animationTime = prefersReducedMotion ? 0 : 150;

  return (
    <ClassNames>
      {({ css }) => (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onClose}
          closeTimeoutMS={animationTime}
          overlayClassName={{
            base: css`
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.4);
              opacity: 0;
              transition: opacity ${animationTime}ms ease-out;
            `,
            afterOpen: css`
              opacity: 1 !important;
            `,
            beforeClose: css`
              opacity: 0 !important;
            `,
          }}
          className={{
            base: css`
              position: absolute;
              display: inline-block;
              width: 40rem;
              top: 50%;
              left: 50%;
              outline: 0;
              opacity: 0;
              transform: translate(-50%, -50%);
              transition: ${animationTime}ms ease-out;
              transition-property: opacity, transition;
            `,
            afterOpen: css`
              opacity: 1 !important;
            `,
            beforeClose: css`
              opacity: 0 !important;
            `,
          }}
        >
          <Wrapper>
            {header && (
              <Header>
                <StyledH2>{header}</StyledH2>
              </Header>
            )}
            <Body>
              {children}
            </Body>
            <Footer>
              <Button onClick={onClose}>{acceptButtonText}</Button>
            </Footer>
          </Wrapper>
        </ReactModal>
      )}
    </ClassNames>
  );
};
