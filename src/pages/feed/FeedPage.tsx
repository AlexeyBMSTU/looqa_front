import { useEffect, useRef, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Skeleton } from 'antd';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { feedModel } from '@/features/feed/models';
import styles from './FeedPage.module.css';
import { ProjectCard } from './components/ProjectCard/ProjectCard';

export const FeedPage = observer(() => {
  const sentinelObserverRef = useRef<IntersectionObserver | null>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  // Callback ref на контейнер списка — читаем offsetTop после монтирования.
  // useRef + useEffect не подходит: при инициализации useWindowVirtualizer
  // listRef.current ещё null и scrollMargin получает 0.
  const listCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setScrollMargin(node.offsetTop);
  }, []);

  useEffect(() => {
    feedModel.loadFeed();
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: feedModel.projects.length,
    estimateSize: () => 340,
    measureElement: el => el.getBoundingClientRect().height,
    overscan: 2,
    gap: 20,
    scrollMargin,
  });

  const items = virtualizer.getVirtualItems();

  // Подгружаем следующую страницу когда виртуализатор дошёл до последнего элемента
  useEffect(() => {
    const lastItem = items[items.length - 1];
    if (!lastItem) return;
    if (
      lastItem.index >= feedModel.projects.length - 1 &&
      feedModel.hasMore &&
      !feedModel.isLoadingMore
    ) {
      feedModel.loadMore();
    }
  }, [items]);

  // Резервный sentinel на случай если virtualizer не успел подтянуть данные
  const sentinelRef = useCallback((node: HTMLDivElement | null) => {
    sentinelObserverRef.current?.disconnect();
    sentinelObserverRef.current = null;
    if (!node) return;
    sentinelObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          feedModel.hasMore &&
          !feedModel.isLoadingMore
        ) {
          feedModel.loadMore();
        }
      },
      { rootMargin: '200px' }
    );
    sentinelObserverRef.current.observe(node);
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Лента проектов</h1>

      {feedModel.isLoading ? (
        <div className={styles.skeletons}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <Skeleton active avatar paragraph={{ rows: 4 }} />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/*
            listRef — контейнер, чья высота = virtualizer.getTotalSize().
            Внутри только рендеримые карточки, позиционированные через translateY.
            Карточки за пределами viewport + overscan не рендерятся вообще.
          */}
          <div
            ref={listCallbackRef}
            style={{ height: virtualizer.getTotalSize(), position: 'relative' }}
          >
            {items.map(virtualRow => {
              const project = feedModel.projects[virtualRow.index];
              return (
                <div
                  key={project.id}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    transform: `translateY(${virtualRow.start - scrollMargin}px)`,
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              );
            })}
          </div>

          {feedModel.isLoadingMore && (
            <div className={styles.skeletons}>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                  <Skeleton active avatar paragraph={{ rows: 3 }} />
                </div>
              ))}
            </div>
          )}

          <div
            ref={sentinelRef}
            className={styles.sentinel}
            aria-hidden="true"
          />

          {!feedModel.hasMore && feedModel.projects.length > 0 && (
            <p className={styles.endMessage}>Вы посмотрели все проекты</p>
          )}
        </>
      )}
    </div>
  );
});
