import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";



export async  function GET(){

  const data = await prisma.compteur.findMany({
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

  if(!body.abonnement || !body.type_compteur || !body.client_id){
   return NextResponse.json({
      error : 'les données  ne sont pas correcte',
      reponse: '400'
    },{status : 400});
  }

 const prismaData = await prisma.compteur.create({
    data: {
      abonnement: body.abonnement,
      type_compteur: body.type_compteur,
      client_id: body.client_id
    }
  });


  return  NextResponse.json({
    message : 'le compteur a été crée avec succès',
    prisma : prismaData
  },{status : 201});
  
}



