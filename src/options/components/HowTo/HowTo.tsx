import { useState, useCallback, useMemo } from 'react';
import { i18n } from '../../utils/i18n/i18n';
import { H2 } from '../Headings/Headings';
import { LinkButton } from '../LinkButton/LinkButton';
import { Modal } from '../Modal/Modal';

import { Ol, YTIframe } from './HowTo.styled';
import { getTranslatedText } from '../../../shared/getTranslatedText/getTranslatedText';

export const HowTo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);
  const isMac = useMemo(
    () => navigator.userAgent.indexOf('Mac OS X') !== -1,
    [],
  );

  return (
    <>
      <div>
        <H2>{i18n('how_to_header')}</H2>
        <p>{i18n('how_to', [isMac ? 'Cmd+Shift+X' : 'Ctrl+Shift+X'])}</p>
        <p>
          <LinkButton onClick={openModal}>{i18n('change_shrt')}</LinkButton>
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
            {i18n('change_shrt_popup_line1', [
              <LinkButton
                key="link"
                onClick={() =>
                  chrome.tabs.create({
                    url: 'chrome://extensions/shortcuts',
                  })
                }
              >
                chrome://extensions/shortcuts
              </LinkButton>,
            ])}
          </li>
          <li>{i18n('change_shrt_popup_line2')}</li>
          <li>{i18n('change_shrt_popup_line3')}</li>
        </Ol>

        <YTIframe
          src="https://www.youtube-nocookie.com/embed/-lavzrWOins"
          title="How to Change the Extension's Shortcut?"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></YTIframe>
      </Modal>
    </>
  );
};
