import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";



export async  function GET(){

  const data = await prisma.client.findMany({
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

  if(!body.type_client || !body.nom_organisation){
   return NextResponse.json({
      error : 'les données ne sont pas correcte',
      reponse: '400'
    },{status : 400});
  }

 const prismaData = await prisma.client.create({
    data: {
      type_client: body.type_client,
      nom_organisation: body.nom_organisation
    }
  });


  return  NextResponse.json({
    message : 'le client a été crée avec succès',
    prisma : prismaData
  },{status : 201});
  
}



