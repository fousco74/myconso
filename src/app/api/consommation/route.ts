import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";



export async  function GET(){

  const data = await prisma.consommation.findMany({
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

  if(!body.consommation_kw || !body.consommation_fcfa || !body.index_id){
   return NextResponse.json({
      error : 'les données  ne sont pas correcte',
      reponse: '400'
    },{status : 400});
  }

 const prismaData = await prisma.consommation.create({
    data: {
      consommation_kw: body.consommation_kw,
      consommation_fcfa: body.consomation_fcfa,
      index_id: body.index_id
    }
  });


  return  NextResponse.json({
    message : 'la consommation a été crée avec succès',
    prisma : prismaData
  },{status : 201});
  
}



