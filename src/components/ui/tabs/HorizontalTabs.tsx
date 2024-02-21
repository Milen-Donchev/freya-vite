import map from 'lodash/map';
import find from 'lodash/find';
import classNames from 'classnames';
import React, { type Dispatch, type SetStateAction, useMemo } from 'react';
import ButtonTab from '@components/ui/tabs/partials/ButtonTab';
import UnderlinedTab from '@components/ui/tabs/partials//UnderlinedTab';

interface Tab {
  id: number;
  key: string;
  title: string;
  content?: JSX.Element;
  onClick?: (...args: any) => any;
}

export type TabKeys<T extends Tab[] | readonly Tab[]> = T[number]['key'];

interface HorizontalTabsProps<T extends Tab[] | readonly Tab[]> {
  tabs: T;
  selectedTab: TabKeys<T>;
  setSelectedTab: Dispatch<SetStateAction<TabKeys<T>>>;
  type?: 'default' | 'underlined';
  className?: string;
  disabled?: boolean;
}

const HorizontalTabs = <T extends Tab[] | readonly Tab[]>(props: HorizontalTabsProps<T>) => {
  const {
    tabs,
    selectedTab,
    setSelectedTab,
    type = 'default',
    className,
    disabled = false
  } = props;

  const currentTab = useMemo(() => find(tabs, (tab) => tab.key === selectedTab), [selectedTab]);

  return (
    <>
      {/* TAB BUTTONS */}
      <div
        className={classNames(
          'd-flex',
          'overflow-auto',
          'custom-scrollbar',
          'gap-12',
          'mb-16',
          'py-8',
          className
        )}>
        {map(tabs, ({ id, key, title, onClick }) =>
          type === 'underlined' ? (
            <UnderlinedTab
              key={id}
              title={title}
              tabKey={key}
              isSelected={key === selectedTab}
              onClick={() => {
                if (disabled) return;
                setSelectedTab(key);
                onClick && onClick();
              }}
            />
          ) : (
            <ButtonTab
              key={id}
              title={title}
              tabKey={key}
              isSelected={key === selectedTab}
              onClick={() => {
                if (disabled) return;
                setSelectedTab(key);
                onClick && onClick();
              }}
            />
          )
        )}
      </div>

      {/* TAB CONTENT */}
      {currentTab && !!currentTab.content && currentTab.content}
    </>
  );
};

export default HorizontalTabs;
