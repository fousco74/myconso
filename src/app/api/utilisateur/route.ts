import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";



export async  function GET(){

  const data = await prisma.user.findMany({
    orderBy: {
      id: 'asc'
    }
  });

  if(data !=null && data!=undefined)
  return  NextResponse.json({
    message : 'successfull',
    data : data
  },{status : 200});
}

export async  function POST(request : Request){

  const body = await request.json();

  if(!body.nom || !body.prenoms || !body.date_naissance || !body.email || !body.mot_de_passe || !body.client_id || !body.role_id){
   return NextResponse.json({
      error : 'les données ne sont pas correcte',
      reponse: '400'
    },{status : 400});
  }

 const prismaData = await prisma.user.create({
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
    message : 'l\'utilisateur a été crée avec succès',
    prisma : prismaData
  },{status : 201});
  
}



