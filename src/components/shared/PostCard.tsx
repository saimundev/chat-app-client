"use client";

import React, { useState } from 'react'
import LoveOutlineIcon from '../icon/LoveOutlineIcon'
import LoveSolidIcon from '../icon/LoveSolidIcon'
import CommentOutlineIcon from '../icon/CommentOutlineIcon'
import CommentSolidIcon from '../icon/CommentSolidIcon'

const PostCard = () => {
    const [love, setLove] = useState(false);
    const [comment, setComment] = useState(false)
    return (
        <div>
            <div className="flex gap-4 mt-10">
                <img className="w-12 h-12 object-fill rounded-full" src="https://res.cloudinary.com/saimun/image/upload/v1684076415/social_media/idshsjow6ujsfv8rmnjj.jpg" alt="" />
                <div className="">
                    <h4 className="font-semibold">md sakib hasan</h4>
                    <p className="text-gray-500">6 months ago</p>
                </div>
            </div>

            <div className="">
                <h2 className='text-lg mt-3 mb-2'>hello there update</h2>
                <img className="rounded h-80 object-cover w-full" src="https://res.cloudinary.com/saimun/image/upload/v1684076448/social_media/f1qf86xtd8llrnzujg18.png" alt="" />
                <div className="">

                </div>
            </div>

            <div className="flex">
                <div className="flex-1 flex justify-center  border border-gray-300 py-1 cursor-pointer hover:bg-gray-200">
                    {love ? <LoveOutlineIcon className="w-6 h-6" /> : <LoveSolidIcon className="w-6 h-6 text-red-600" />}

                </div>
                <div className="flex-1 flex justify-center border border-gray-300 py-1 cursor-pointer hover:bg-gray-200">  <CommentSolidIcon className="w-6 h-6 text-gray-600" />  </div>
            </div>
        </div>
    )
}

export default PostCard