import { useState, useMemo } from 'react';
import { PlayIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LinkButton } from '../LinkButton/LinkButton';
import { i18n } from '../../utils/i18n/i18n';
import videoThumbnailDark from './video-thumbnail-dark.webp';
import videoThumbnailLight from './video-thumbnail-light.webp';

const thumbnailClassName =
  'size-full rounded-[inherit] object-cover outline-1 -outline-offset-1';

export const HowTo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMac = useMemo(
    () => navigator.userAgent.indexOf('Mac OS X') !== -1,
    [],
  );

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="text-lg">{i18n('how_to_header')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>{i18n('how_to', [isMac ? 'Cmd+Shift+X' : 'Ctrl+Shift+X'])}</p>
        <LinkButton onClick={() => setIsModalOpen(true)}>
          {i18n('change_shrt')}
        </LinkButton>
      </CardContent>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="gap-4 sm:max-w-lg"
        >
          <DialogHeader>
            <DialogTitle className="pr-8">{i18n('change_shrt')}</DialogTitle>
          </DialogHeader>
          <ol className="list-decimal space-y-1 pl-5 text-sm">
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
          </ol>
          <a
            href="https://www.youtube.com/watch?v=-lavzrWOins"
            target="_blank"
            rel="noreferrer"
            aria-label={i18n('change_shrt_video')}
            className="group relative block aspect-video overflow-hidden rounded-2xl bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            <img
              src={videoThumbnailLight}
              alt=""
              className={`${thumbnailClassName} outline-black/10 dark:hidden`}
            />
            <img
              src={videoThumbnailDark}
              alt=""
              className={`${thumbnailClassName} hidden outline-white/15 dark:block`}
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-17 items-center justify-center rounded-xl bg-red-600 text-white group-hover:bg-red-700">
                <PlayIcon aria-hidden className="size-6 fill-current" />
              </span>
            </span>
          </a>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
