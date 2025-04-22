import Image from 'next/image'
import React from 'react'
import Icon from './Icon'
import DropdownMenu from './DropdownMenu copy';

const options = [
  { value: "settings", label: "Settings", icon:"caret" },
];

const Header = () => {
  return (
    <header className=' fixed start-0 top-0 xl:ps-[310px] z-40 border-b border-gray-20 bg-white ps-[250px] min-h-[100px] right-0 flex items-center'>
      <div className="flex items-center gap-4 justify-end w-full pe-4">
        <Image src="/Notification.svg" alt="clock" width={40} height={40} />
        <div className='flex items-center cursor-pointer'>
          <div className='w-10 h-10 border bg-gray-50 rounded-full'>
            <Image src="" alt="usefer" width={40} height={40} id='header-profile' className=' rounded-full object-cover h-full w-full' />
          </div>
          {/* <span><Icon name='caret' fill='#48505e'/></span> */}
        </div>
        <DropdownMenu />
      </div>
    </header>
  )
}

export default Header


