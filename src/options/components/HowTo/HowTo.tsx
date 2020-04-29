import React, { useState } from 'react';
import I18n from '../I18n';
import { H2 } from '../Headings';
import LinkButton from '../LinkButton';
import Modal from '../Modal';

import { Ol } from './HowTo.styled';
import { getTranslatedText } from '../../../shared/getTranslatedText/getTranslatedText';

const HowTo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => { setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); };

  return (
    <>
      <div>
        <H2><I18n>how_to_header</I18n></H2>
        <p><I18n>how_to</I18n></p>
        <p>
          <LinkButton onClick={openModal}><I18n>change_shrt</I18n></LinkButton>
        </p>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        header={getTranslatedText('change_shrt')}
        acceptButtonText={getTranslatedText('i_understand')}
      >
        <Ol>
          <li>
            <I18n
              substitutions={[
                <LinkButton href="chrome://extensions/">chrome://extensions/</LinkButton>,
              ]}
            >
              change_shrt_popup_line1
            </I18n>
          </li>
          <li><I18n>change_shrt_popup_line2</I18n></li>
          <li><I18n>change_shrt_popup_line3</I18n></li>
        </Ol>
      </Modal>
    </>
  );
};

export default HowTo;
