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

  if(!body.valeur_kw || !body.compteur_id ){
   return NextResponse.json({
      error : 'les données ne sont pas correcte',
      reponse: '400'
    },{status : 400});
  }

 const prismaData = await prisma.index.create({
    data: {
      valeur_kw: body.valeur_kw,
      compteur_id: body.compteur_id
    }
  });


  return  NextResponse.json({
    message : 'l\'utilisateur a été crée avec succès',
    prisma : prismaData
  },{status : 201});
  
}



