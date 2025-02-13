import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async  function DELETE(request : Request, { params }: { params: {id: string}}){

    const userId = parseInt(params.id);
    if(!userId){
        return NextResponse.json({
           error : 'id du client est obligatoire',
           reponse: '419'
         },{status : 419});
       }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    });

    if(!user) return NextResponse.json({
        error : 'l\'utilisateur n\'existe pas',
        reponse: '404'
      },{status : 404});
  
    
  
   const prismaData = await prisma.user.delete({
      where:{
        id: userId
      }
    });
  
  
    return  NextResponse.json({
      message : 'l\'utilisateur a été supprimer avec succès',
      prisma : prismaData
    },{status : 200});
    
  }


  export async  function PATCH(request : Request, { params }: { params: {id: string}}){

    const body = await request.json()

    const userId = parseInt(params.id);
    if(!userId){
        return NextResponse.json({
           error : 'id est obligatoire et doit etre un nombre',
           reponse: '419'
         },{status : 419});
       }

    const user = await prisma.client.findUnique({
        where: {
            id: userId,
        }
    });

    if(!user) return NextResponse.json({
        error : 'l\'utilisateur n\'existe pas',
        reponse: '404'
      },{status : 404});
  
      if(!body.nom || !body.prenoms || !body.date_naissance || !body.email || !body.mot_de_passe || !body.client_id || !body.role_id){
        return NextResponse.json({
           error : 'les données ne sont pas correcte',
           reponse: '400'
         },{status : 400});
       }
  
   const prismaData = await prisma.user.update({
      where:{
        id: userId
      },
      data: {
        nom: body.nom,
        prenoms: body.prenoms,
        date_naissance: body.date_naissance,
        email: body.email,
        mot_de_passe:  body.mot_de_passe,
        client_id: body.client_id,
        role_id: body.role_id
      }
    });
  
  
    return  NextResponse.json({
      message : 'l\'utilisateur a été modifier avec succès',
      prisma : prismaData
    },{status : 200});
    
  }