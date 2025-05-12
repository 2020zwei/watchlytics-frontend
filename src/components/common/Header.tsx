"use client"
import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import Icon from './Icon';
import Link from 'next/link';
import { useAppContext } from '@/providers/AppContextProvider';
import { sendRequest } from '@/utils/apis';
import { METHODS, URLS } from '@/utils/constants';
import clsx from 'clsx';
import SearchBar from './SearchBar';
import NotificationsModal from '../Notification';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname()
  const { user, setCurrentUser } = useAppContext();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const shouldSearch = ["/dashboard", "/inventory", "/reports", "/report-chart"];

  const showSearchBar = shouldSearch.includes(pathname);

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };
  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  useEffect(() => {
    const getProfileInfo = async () => {
      const PAYLOAD: any = {
        url: URLS.ME,
        method: METHODS.GET,
      }
      sendRequest(PAYLOAD).then((res) => {
        if (res?.data) {
          setCurrentUser({ image: res?.data?.data?.profile_picture })
        }
      })
    }
    getProfileInfo()
  }, [])


  return (

    <div className={clsx("flex items-center w-full pe-4", showSearchBar ? "justify-between" : "justify-end")}>
      {showSearchBar ?
        <div className='flex items-center border rounded-lg flex-1 me-3 max-w-[320px] ps-4 border-[#F0F1F3] font-normal'>
          <SearchBar placeholder='Search product, supplier, order' icon='search'
            inputClass='order-1'
            placeholderClass='placeholder:text-[#858D9D] sm:placeholder:text-base placeholder:text-xs'
          />
        </div> : null}
      <div className='flex items-center'>
        <span onClick={handleUploadClick}><Icon name='bell' /></span>
        <Dropdown className='!rounded-lg'>
          <DropdownTrigger>
            <Button className=' bg-transparent'>
              <div className={clsx('w-10 h-10 border rounded-full', user?.image ? "" : "bg-gray-300")}>
                {user?.image ? <img src={user?.image} alt="usefer" width={40} height={40} className=' rounded-full object-cover h-full w-full' /> : null}
              </div>
              <span><Icon name='caret' fill='#ACACAC' className='!mx-0' /></span>
            </Button>

          </DropdownTrigger>
          <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
            <DropdownItem
              key="new"
              className=' text-blue-850 text-sm'
              startContent={<Icon name='users' />}>
              <Link href="/profile" className='block'>Profile</Link>
            </DropdownItem>
            <DropdownItem
              key="subscription"
              className=' text-blue-850 text-sm'
              startContent={<Icon name='card' stroke='#003BFF' />}            >
              <Link href="/subscriptions" className='block'>Subscription</Link>
            </DropdownItem>
            <DropdownItem
              key="payments"
              className=' text-blue-850 text-sm'
              startContent={<Icon name='card' stroke='#003BFF' />}            >
              <Link href="/payments" className='block'>Payments</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <NotificationsModal isOpen={isUploadModalOpen} onOpen={closeUploadModal} />
    </div>
  )
}

export default Header


