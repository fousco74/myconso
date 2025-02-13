import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async  function POST(request : Request, {params} : {params : {
    id: string,
    permissionId: string
}}){

   const roleId = parseInt(params.id)
   const permissionId = parseInt(params.permissionId)

    const role = prisma.role.findUnique({
        where: {
            id: roleId
        }
    })

    const permission = prisma.permission.findUnique({
        where: {
            id: permissionId
        }
    })

    if(!roleId || !role) return NextResponse.json({
        error : 'le role n\'existe pas',
        reponse: '404'
      },{status : 404});

      if(!permissionId || !permission) return NextResponse.json({
        error : 'la permission n\'existe pas',
        reponse: '404'
      },{status : 404});


 
 const prismaData = await prisma.role_permission.create({
    data: {
      role_id: roleId,
      permission_id: permissionId
    }
  });


  return  NextResponse.json({
    message : 'la relation role/permission a été crée avec succès',
    prisma : prismaData
  },{status : 201});
  
}



