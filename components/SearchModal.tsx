'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

type SearchResponse = {
  coins?: SearchCoin[];
};

const MAX_RESULTS = 10;

const SearchModal = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchCoin[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const trimmedQuery = query.trim();

  const shownResults = useMemo(
    () => results.filter((c) => Boolean(c?.id)).slice(0, MAX_RESULTS),
    [results],
  );

  const close = () => {
    setOpen(false);
    setQuery('');
    setResults([]);
    setActiveIndex(0);
  };

  const selectCoin = (coinId: string) => {
    close();
    router.push(`/coins/${coinId}`);
  };

  useEffect(() => {
    if (!open) return;
    // Focus input on open.
    const id = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes('mac');
      const isK = e.key.toLowerCase() === 'k';
      const isShortcut = isK && ((isMac && e.metaKey) || (!isMac && e.ctrlKey));

      if (isShortcut) {
        e.preventDefault();
        setOpen(true);
        return;
      }

      if (!open) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }

      if (!shownResults.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, shownResults.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter') {
        const selected = shownResults[activeIndex];
        if (selected?.id) {
          e.preventDefault();
          selectCoin(selected.id);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, shownResults, activeIndex]);

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    const q = trimmedQuery;

    if (!q) {
      setResults([]);
      setLoading(false);
      setActiveIndex(0);
      return () => controller.abort();
    }

    setLoading(true);

    const id = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          setResults([]);
          return;
        }

        const json = (await res.json()) as SearchResponse;
        const next = json.coins ?? [];
        setResults(next);
        setActiveIndex(0);
      } catch (e) {
        if ((e as { name?: string })?.name !== 'AbortError') {
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(id);
      controller.abort();
    };
  }, [open, trimmedQuery]);

  return (
    <div id="search-modal">
      <button type="button" className="trigger" onClick={() => setOpen(true)}>
        Search
        <span className="kbd">
          <span>Ctrl</span>
          <span>K</span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          style={{ backgroundColor: 'color-mix(in oklab, var(--dark-900) 70%, transparent)' }}
        >
          <div className="dialog w-full rounded-lg overflow-hidden">
            <div className="cmd-input p-3">
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search coins..."
                aria-label="Search coins"
              />
            </div>

            <div className="list">
              {!trimmedQuery && <div className="empty">Type to search</div>}
              {trimmedQuery && loading && <div className="empty">Searching...</div>}
              {trimmedQuery && !loading && shownResults.length === 0 && (
                <div className="empty">No results</div>
              )}

              {shownResults.map((coin, index) => (
                <div
                  key={coin.id}
                  className="search-item px-4"
                  data-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectCoin(coin.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') selectCoin(coin.id);
                  }}
                >
                  <div className="coin-info">
                    <Image src={coin.large || coin.thumb} alt={coin.name} width={36} height={36} />
                    <div>
                      <p>{coin.name}</p>
                      <p className="coin-symbol">{coin.symbol}</p>
                    </div>
                  </div>

                  <div className="coin-price">
                    {coin.market_cap_rank ? `#${coin.market_cap_rank}` : '-'}
                  </div>

                  <div className="coin-change">{coin.symbol?.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
