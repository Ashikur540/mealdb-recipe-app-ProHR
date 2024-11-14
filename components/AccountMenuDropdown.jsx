import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import React from 'react'
import IconCaretDown from './icons/IconDown'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'

export const AccountMenuDropDown = () => {
    const { authLoading, user, logout } = useAuth()
    const handleLogout = async () => {
        await logout()
        toast.success("Logged out")
    }
    return (
        <div>
            <Popover>
                <PopoverButton className={`bg-yellow-300 text-yellow-900 px-4 py-2 rounded-md text-sm font-semibold`}>{user?.displayName}</PopoverButton>
                <PopoverPanel
                    anchor="bottom"
                    transition
                    className="flex origin-top flex-col transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 z-[999] bg-amber-50/80 max-w-[200px] p-2 rounded shadow border border-yellow-700/10"
                >
                    <button className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-dark hover:text-rose-400 rounded-sm" onClick={handleLogout}>
                        <span className="flex items-center gap-2">
                            Log out
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.3 0.449997H8.47502C7.82502 0.449997 7.27502 0.999997 7.27502 1.65V3.375C7.27502 3.675 7.52502 3.925 7.82502 3.925C8.12502 3.925 8.40002 3.675 8.40002 3.375V1.625C8.40002 1.575 8.42502 1.55 8.47502 1.55H11.3C11.9 1.55 12.375 2.025 12.375 2.625V13.35C12.375 13.95 11.9 14.425 11.3 14.425H8.47502C8.42502 14.425 8.40002 14.4 8.40002 14.35V12.625C8.40002 12.325 8.15002 12.075 7.82502 12.075C7.50002 12.075 7.27502 12.325 7.27502 12.625V14.35C7.27502 15 7.82502 15.55 8.47502 15.55H11.3C12.525 15.55 13.5 14.55 13.5 13.35V2.65C13.5 1.425 12.5 0.449997 11.3 0.449997Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M4.39998 8.55H8.87498C9.17498 8.55 9.42498 8.3 9.42498 8C9.42498 7.7 9.17498 7.45 8.87498 7.45H4.42498L5.97498 5.875C6.19998 5.65 6.19998 5.3 5.97498 5.075C5.74998 4.85 5.39998 4.85 5.17498 5.075L2.67498 7.625C2.44998 7.85 2.44998 8.2 2.67498 8.425L5.17498 10.975C5.27498 11.075 5.42498 11.15 5.57498 11.15C5.72498 11.15 5.84998 11.1 5.97498 11C6.19998 10.775 6.19998 10.425 5.97498 10.2L4.39998 8.55Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                    </button>
                </PopoverPanel>
            </Popover>
        </div>

    )
}
