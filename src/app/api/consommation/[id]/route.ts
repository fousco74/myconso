import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async  function DELETE(request : Request, { params }: { params: {id: string}}){

    const consommationId = parseInt(params.id);
    if(!consommationId){
        return NextResponse.json({
           error : 'id de la consommation est obligatoire',
           reponse: '419'
         },{status : 419});
       }

    const consommation = await prisma.consommation.findUnique({
        where: {
            id: consommationId,
        }
    });

    if(!consommation) return NextResponse.json({
        error : 'la consommation n\'existe pas',
        reponse: '404'
      },{status : 404});
  
    
  
   const prismaData = await prisma.consommation.delete({
      where:{
        id: consommationId
      }
    });
  
  
    return  NextResponse.json({
      message : 'la consommation a été supprimer avec succès',
      prisma : prismaData
    },{status : 200});
    
  }


  export async  function PATCH(request : Request, { params }: { params: {id: string}}){

    const body = await request.json()

    const consommationId = parseInt(params.id);
    if(!consommationId){
        return NextResponse.json({
           error : 'id est obligatoire et doit etre un nombre',
           reponse: '419'
         },{status : 419});
       }

    const consommation = await prisma.consommation.findUnique({
        where: {
            id: consommationId,
        }
    });

    if(!consommation) return NextResponse.json({
        error : 'la consommation n\'existe pas',
        reponse: '404'
      },{status : 404});
  
      if(!body.consommation_kw || !body.consommation_fcfa || !body.index_id){
        return NextResponse.json({
           error : 'les données  ne sont pas correcte',
           reponse: '400'
         },{status : 400});
       }
  
   const prismaData = await prisma.consommation.update({
      where:{
        id: consommationId
      },
      data: {
        consommation_kw: body.consommation_kw,
        consommation_fcfa: body.consommation_fcfa,
        index_id: body.index_id
      }
    });
  
  
    return  NextResponse.json({
      message : 'la consommation a été modifier avec succès',
      prisma : prismaData
    },{status : 200});
    
  }