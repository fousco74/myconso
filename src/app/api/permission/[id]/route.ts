import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async  function DELETE(request : Request, { params }: { params: {id: string}}){

    const permissionId = parseInt(params.id);
    if(!permissionId){
        return NextResponse.json({
           error : 'id  est obligatoire',
           reponse: '419'
         },{status : 419});
       }

    const permission = await prisma.permission.findUnique({
        where: {
            id: permissionId,
        }
    });

    if(!permission) return NextResponse.json({
        error : 'la permission n\'existe pas',
        reponse: '404'
      },{status : 404});
  
    
  
   const prismaData = await prisma.permission.delete({
      where:{
        id: permissionId
      }
    });
  
  
    return  NextResponse.json({
      message : 'la permission a été supprimer avec succès',
      prisma : prismaData
    },{status : 200});
    
  }


  export async  function PATCH(request : Request, { params }: { params: {id: string}}){

    const body = await request.json()

    const permissionId = parseInt(params.id);
    if(!permissionId){
        return NextResponse.json({
           error : 'id est obligatoire et doit etre un nombre',
           reponse: '419'
         },{status : 419});
       }

    const permission = await prisma.role.findUnique({
        where: {
            id: permissionId,
        }
    });

    if(!permission) return NextResponse.json({
        error : 'la permission n\'existe pas',
        reponse: '404'
      },{status : 404});
  
      if(!body.nom  ){
        return NextResponse.json({
           error : 'les données ne sont pas correcte',
           reponse: '400'
         },{status : 400});
       }

  
   const prismaData = await prisma.permission.update({
      where:{
        id: permissionId
      },
      data: {
        nom: body.nom,
      }
    });
  
  
    return  NextResponse.json({
      message : 'la permission a été modifier avec succès',
      prisma : prismaData
    },{status : 200});
    
  }