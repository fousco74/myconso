import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";



export async  function GET(){

  const data = await prisma.permission.findMany({
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

  if(!body.nom  ){
   return NextResponse.json({
      error : 'les données ne sont pas correcte',
      reponse: '400'
    },{status : 400});
  }

 const prismaData = await prisma.permission.create({
    data: {
      nom: body.nom
    }
  });


  return  NextResponse.json({
    message : 'la permission a été crée avec succès',
    prisma : prismaData
  },{status : 201});
  
}



