import { i18n } from '../../utils/i18n/i18n';

export const Header = () => (
  <header className="border-b">
    <div className="mx-auto max-w-6xl px-6 py-4">
      <h1 className="text-xl font-semibold">{i18n('options_title')}</h1>
    </div>
  </header>
);
