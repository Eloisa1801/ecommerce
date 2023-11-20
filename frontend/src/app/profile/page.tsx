'use client';
import React from 'react';
import { Tabs } from 'antd';
import CategoriesList from './components/CategoriesList';
import { useRouter } from 'next/navigation';
function Profile() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [selectedTab, setSelectedTab] = useState<string>(id || "1")
  const router = useRouter();
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Products',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Categories',
      children: <CategoriesList />,
    },
    {
      key: '3',
      label: 'Orders',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: 'Users',
      children: 'Content of Tab Pane 4',
    },
  ];

  return (
    <div className="p-5">
      <Tabs defaultActivaKey="1"
        items={items}
        onChange={(key) => {
          router.push(`/profile?id=${key}`);
          setSelectedTab(key);
        }}
        activeKey={selectedTab}
      ></Tabs>
    </div>
  );
}

export default Profile;
