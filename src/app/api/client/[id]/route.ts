import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async  function DELETE(request : Request, { params }: { params: {id: string}}){

    const clientId = parseInt(params.id);
    if(!clientId){
        return NextResponse.json({
           error : 'id du client est obligatoire',
           reponse: '419'
         },{status : 419});
       }

    const client = await prisma.client.findUnique({
        where: {
            id: clientId,
        }
    });

    if(!client) return NextResponse.json({
        error : 'le client n\'existe pas',
        reponse: '404'
      },{status : 404});
  
    
  
   const prismaData = await prisma.client.delete({
      where:{
        id: clientId
      }
    });
  
  
    return  NextResponse.json({
      message : 'le client a été supprimer avec succès',
      prisma : prismaData
    },{status : 200});
    
  }


  export async  function PATCH(request : Request, { params }: { params: {id: string}}){

    const body = await request.json()

    const clientId = parseInt(params.id);
    if(!clientId){
        return NextResponse.json({
           error : 'id est obligatoire et doit etre un nombre',
           reponse: '419'
         },{status : 419});
       }

    const client = await prisma.client.findUnique({
        where: {
            id: clientId,
        }
    });

    if(!client) return NextResponse.json({
        error : 'le client n\'existe pas',
        reponse: '404'
      },{status : 404});
  
    
      if(!body.type_client || !body.nom_organisation){
        return NextResponse.json({
           error : 'les données ne sont pas correcte',
           reponse: '400'
         },{status : 400});
       }
  
   const prismaData = await prisma.client.update({
      where:{
        id: clientId
      },
      data: {
        type_client: body.type_client,
        nom_organisation: body.nom_organisation
      }
    });
  
  
    return  NextResponse.json({
      message : 'le client a été modifier avec succès',
      prisma : prismaData
    },{status : 200});
    
  }