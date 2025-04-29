"use client"
import React, { useEffect } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import Icon from './Icon';
import Link from 'next/link';
import { useAppContext } from '@/providers/AppContextProvider';
import { sendRequest } from '@/utils/apis';
import { METHODS, URLS } from '@/utils/constants';
import clsx from 'clsx';
import SearchBar from './SearchBar';


const Header = () => {
  const { user, setCurrentUser } = useAppContext();

  useEffect(() => {
    const getProfileInfo = async () => {
      const PAYLOAD:any = {
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

    <div className="flex items-center justify-between w-full pe-4 ">
      <div className='flex items-center border rounded-lg flex-1 mx-3 max-w-[320px] ps-4 border-[#F0F1F3] font-normal'>
        <SearchBar placeholder='Search product, supplier, order' icon='search'
          inputClass='order-1'
          placeholderClass='placeholder:text-[#858D9D] sm:placeholder:text-base placeholder:text-xs'
        />
      </div>
      <div className='flex items-center'>
        <span><Icon name='bell' /></span>
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
              key="new"
              className=' text-blue-850 text-sm'
              startContent={<Icon name='card' stroke='#003BFF' />}            >
              <Link href="/subscriptions" className='block'>Subscription</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header


