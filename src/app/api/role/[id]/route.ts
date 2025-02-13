import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async  function DELETE(request : Request, { params }: { params: {id: string}}){

    const roleId = parseInt(params.id);
    if(!roleId){
        return NextResponse.json({
           error : 'id  est obligatoire',
           reponse: '419'
         },{status : 419});
       }

    const role = await prisma.role.findUnique({
        where: {
            id: roleId,
        }
    });

    if(!role) return NextResponse.json({
        error : 'le role n\'existe pas',
        reponse: '404'
      },{status : 404});
  
    
  
   const prismaData = await prisma.role.delete({
      where:{
        id: roleId
      }
    });
  
  
    return  NextResponse.json({
      message : 'le role a été supprimer avec succès',
      prisma : prismaData
    },{status : 200});
    
  }


  export async  function PATCH(request : Request, { params }: { params: {id: string}}){

    const body = await request.json()

    const roleId = parseInt(params.id);
    if(!roleId){
        return NextResponse.json({
           error : 'id est obligatoire et doit etre un nombre',
           reponse: '419'
         },{status : 419});
       }

    const role = await prisma.role.findUnique({
        where: {
            id: roleId,
        }
    });

    if(!role) return NextResponse.json({
        error : 'le role n\'existe pas',
        reponse: '404'
      },{status : 404});
  
      if(!body.nom  ){
        return NextResponse.json({
           error : 'les données ne sont pas correcte',
           reponse: '400'
         },{status : 400});
       }

  
   const prismaData = await prisma.role.update({
      where:{
        id: roleId
      },
      data: {
        nom: body.nom,
      }
    });
  
  
    return  NextResponse.json({
      message : 'le role a été modifier avec succès',
      prisma : prismaData
    },{status : 200});
    
  }