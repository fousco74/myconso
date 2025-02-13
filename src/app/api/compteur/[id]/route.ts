import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async  function DELETE(request : Request, { params }: { params: {id: string}}){

    const compteurId = parseInt(params.id);
    if(!compteurId){
        return NextResponse.json({
           error : 'id du compteur est obligatoire',
           reponse: '419'
         },{status : 419});
       }

    const todo = await prisma.client.findUnique({
        where: {
            id: compteurId,
        }
    });

    if(!todo) return NextResponse.json({
        error : 'le compteur n\'existe pas',
        reponse: '404'
      },{status : 404});
  
    
  
   const prismaData = await prisma.compteur.delete({
      where:{
        id: compteurId
      }
    });
  
  
    return  NextResponse.json({
      message : 'le compteur a été supprimer avec succès',
      prisma : prismaData
    },{status : 200});
    
  }


  export async  function PATCH(request : Request, { params }: { params: {id: string}}){

    const body = await request.json()

    const compteurId = parseInt(params.id);
    if(!compteurId){
        return NextResponse.json({
           error : 'id est obligatoire et doit etre un nombre',
           reponse: '419'
         },{status : 419});
       }

    const compteur = await prisma.compteur.findUnique({
        where: {
            id: compteurId,
        }
    });

    if(!compteur) return NextResponse.json({
        error : 'le compteur n\'existe pas',
        reponse: '404'
      },{status : 404});
  
    
      if(!body.abonnement || !body.type_compteur || !body.client_id){
        return NextResponse.json({
           error : 'les données  ne sont pas correcte',
           reponse: '400'
         },{status : 400});
       }
  
   const prismaData = await prisma.compteur.update({
      where:{
        id: compteurId
      },
      data: {
        abonnement: body.abonnement,
        type_compteur: body.type_compteur,
        client_id: body.client_id
      }
    });
  
  
    return  NextResponse.json({
      message : 'le compteur a été modifier avec succès',
      prisma : prismaData
    },{status : 200});
    
  }