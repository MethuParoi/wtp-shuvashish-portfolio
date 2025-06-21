import AddRoleCard from '@/components/admin/manage-role/AddRoleCard'
import SettingCard from '@/components/admin/manage-role/AddRoleCard'
import AdminManagement from '@/components/admin/manage-role/AdminManagement'
import React from 'react'

const page = () => {
  return (
    <div>
      <AdminManagement/>
    </div>
  )
  // return (
  //   <div className='py-10 px-20'>
  //     <div>
  //       <h1 className='text-2xl font-semibold text-black'>Manage Admin & Moderators</h1>
  //       <div className='flex gap-x-16 mt-10'>
  //         <AddRoleCard title="Add New Admin" value="An admin has all the access of the website" icon="admin"/>
  //         <AddRoleCard title="Add New Moderator" value="An Moderator has only blog management access" icon="moderator"/>
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default page