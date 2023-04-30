import * as React from 'react';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';

interface TabProps {
  tabs: { name: string; content: React.ReactNode }[];
  tabPanelClassName?: string;
  tabHeaderClassName?: string;
  tabHeaderSelectedClassName?: string;
  onChange?: (index: number) => void;
  defaultIndex?: number;
}

export const Tabs = ({
  tabs,
  tabHeaderClassName,
  tabHeaderSelectedClassName,
  tabPanelClassName,
  defaultIndex = 0,
  onChange,
}: TabProps) => {
  //TODO: Remove the state and useEffect once we test that Tabs work as expected in React 18.
  const [showTabs, setShowTabs] = React.useState(false);

  React.useEffect(() => {
    setShowTabs(true);
  }, []);

  if (!showTabs) {
    return null;
  }

  return (
    <Tab.Group onChange={onChange} defaultIndex={defaultIndex}>
      <Tab.List className='flex'>
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              classNames(
                'w-full py-4 text-[22px] bg-transparent max-lg:text-base font-semibold text-center focus:outline-none border-b-2',
                selected
                  ? 'border-b-grey-light'
                  : 'border-b-transparent text-grey-light',
                tabHeaderClassName,
                { [tabHeaderSelectedClassName || '']: selected }
              )
            }
          >
            {tab.name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((tab) => (
          <Tab.Panel key={tab.name} className={tabPanelClassName}>
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
