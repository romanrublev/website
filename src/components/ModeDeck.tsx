import { useMemo } from 'react';

export interface ModeItem {
  title: string;
  meta: string;
}

export interface ModeDefinition {
  id: string;
  label: string;
  meta: string;
  headline: string;
  copy: string;
  items: ModeItem[];
}

interface ModeDeckProps {
  modes: ModeDefinition[];
  activeModeId: string;
  onSelect: (modeId: string) => void;
}

export default function ModeDeck({
  modes,
  activeModeId,
  onSelect
}: ModeDeckProps) {
  const activeMode = useMemo(() => {
    return modes.find((mode) => mode.id === activeModeId) ?? modes[0];
  }, [modes, activeModeId]);

  return (
    <section className="mode-deck">
      <div
        className="mode-deck__buttons"
        role="tablist"
        aria-label="Identity channels"
      >
        {modes.map((mode) => (
          <button
            key={mode.id}
            role="tab"
            aria-selected={activeMode.id === mode.id}
            aria-controls={`mode-panel-${mode.id}`}
            id={`mode-tab-${mode.id}`}
            onClick={() => onSelect(mode.id)}
            className={`mode-deck__button ${
              activeMode.id === mode.id ? 'is-active' : ''
            }`}
            type="button"
          >
            <span className="mode-deck__button-ripple" aria-hidden="true" />
            <span className="mode-deck__button-label">{mode.label}</span>
            <span className="mode-deck__button-meta">{mode.meta}</span>
          </button>
        ))}
      </div>
      <article
        id={`mode-panel-${activeMode.id}`}
        role="tabpanel"
        aria-labelledby={`mode-tab-${activeMode.id}`}
        className="mode-deck__panel"
      >
        <header className="mode-deck__panel-header">
          <span className="mode-deck__panel-signal">
            <span />
            <span />
            <span />
          </span>
          <div>
            <p className="mode-deck__panel-title">{activeMode.headline}</p>
            <p className="mode-deck__panel-copy">{activeMode.copy}</p>
          </div>
        </header>
        <ul className="mode-deck__list">
          {activeMode.items.map((item) => (
            <li key={item.title}>
              <span className="mode-deck__item-title">{item.title}</span>
              <span className="mode-deck__item-meta">{item.meta}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
