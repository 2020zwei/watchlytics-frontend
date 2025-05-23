"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import Icon from './Icon';
import Link from 'next/link';

const Header = () => {
  useEffect(() => {
    const profileImg = document.getElementById("header-profile") as HTMLImageElement | null;
    if (profileImg) {
      // @ts-ignore
      profileImg.src = localStorage.getItem("profile_picture");
    }
  }, [])
  return (
    <header className=' fixed start-0 top-0 xl:ps-[310px] z-40 border-b border-gray-20 bg-white ps-[250px] min-h-[100px] right-0 flex items-center'>
      <div className="flex items-center justify-end w-full pe-4">
        <Image src="/Notification.svg" alt="clock" width={40} height={40} />
        <Dropdown className='!rounded-lg'>
          <DropdownTrigger>
            <Button className=' bg-transparent'>
              <div className='w-10 h-10 border bg-gray-50 rounded-full'>
                <Image src="" alt="usefer" width={40} height={40} id='header-profile' className=' rounded-full object-cover h-full w-full' />
              </div>
              <span><Icon name='caret' fill='#ACACAC' className='!mx-0' /></span>
            </Button>

          </DropdownTrigger>
          <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
            <DropdownItem
              key="new"
              className=' text-blue-850 text-sm'
              startContent={<Icon name='users' />}>
              <Link href="/UI/profile">Profile</Link>
            </DropdownItem>
            <DropdownItem
              key="new"
              className=' text-blue-850 text-sm'
              startContent={<Icon name='card' stroke='#003BFF' />}            >
              <Link href="/UI/subscriptions">Subscription</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header


