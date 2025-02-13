import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async  function DELETE(request : Request, { params }: { params: {id: string}}){

    const indexId = parseInt(params.id);
    if(!indexId){
        return NextResponse.json({
           error : 'id  est obligatoire',
           reponse: '419'
         },{status : 419});
       }

    const index = await prisma.index.findUnique({
        where: {
            id: indexId,
        }
    });

    if(!index) return NextResponse.json({
        error : 'l\'index n\'existe pas',
        reponse: '404'
      },{status : 404});
  
    
  
   const prismaData = await prisma.index.delete({
      where:{
        id: indexId
      }
    });
  
  
    return  NextResponse.json({
      message : 'l\'index a été supprimer avec succès',
      prisma : prismaData
    },{status : 200});
    
  }


  export async  function PATCH(request : Request, { params }: { params: {id: string}}){

    const body = await request.json()

    const indexId = parseInt(params.id);
    if(!indexId){
        return NextResponse.json({
           error : 'id est obligatoire et doit etre un nombre',
           reponse: '419'
         },{status : 419});
       }

    const index = await prisma.index.findUnique({
        where: {
            id: indexId,
        }
    });

    if(!index) return NextResponse.json({
        error : 'l\'index n\'existe pas',
        reponse: '404'
      },{status : 404});
  
      if(!body.valeur_kw || !body.compteur_id ){
        return NextResponse.json({
           error : 'les données ne sont pas correcte',
           reponse: '400'
         },{status : 400});
       }

  
   const prismaData = await prisma.index.update({
      where:{
        id: indexId
      },
      data: {
        valeur_kw: body.valeur_kw,
        compteur_id: body.compteur_id
      }
    });
  
  
    return  NextResponse.json({
      message : 'l\'index a été modifier avec succès',
      prisma : prismaData
    },{status : 200});
    
  }