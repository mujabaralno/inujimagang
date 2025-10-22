import InviteUser from '@/components/superadmin/InviteUser'
import React from 'react'
import { Suspense } from "react";
import TableAllUser from '@/components/superadmin/AllUser';
import { getAllUser } from "@/actions/user.actions";
import { Users } from "lucide-react";

const AllUserPage  = async () => {
    const allUsers = await getAllUser();
  return (
    <div className="p-6 space-y-6 min-h-screen">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <div className='w-full p-4 border border-slate-200 border-dashed rounded-2xl shadow-md bg-white'>
            <InviteUser />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="bg-[#25388C] p-6">
            <div className="flex items-center gap-3 text-white">
              <Users className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Semua Anggota</h2>
              <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                {allUsers.length} anggota
              </span>
            </div>
          </div>
          <div className="p-6">
            <TableAllUser users={allUsers} />
          </div>
        </div>
      </Suspense>
    </div>
  )
}

export default AllUserPage