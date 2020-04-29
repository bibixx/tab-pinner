import React, { useState } from 'react';
import I18n from '../I18n';
import { H2 } from '../Headings';
import LinkButton from '../LinkButton';
import Modal from '../Modal';
import Ol from '../Ol';

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
      >
        <H2><I18n>change_shrt</I18n></H2>
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
        <button type="button" onClick={closeModal}><I18n>i_understand</I18n></button>
      </Modal>
    </>
  );
};

export default HowTo;
