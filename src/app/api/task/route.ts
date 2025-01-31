import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async  function GET(){

  const data = await prisma.todo.findMany();
    
  return  NextResponse.json({
    message : 'successfull',
    data : data
  },{status : 200});
}

export async  function POST(request : Request){

  const data = await request.json();

  if(!data.name){
   return NextResponse.json({
      error : 'donnée vide',
      reponse: '419'
    },{status : 419});
  }

 const prismaData = await prisma.todo.create({
    data: {
      name : data.name
    }
  });


  return  NextResponse.json({
    message : 'la tache a été crée avec succès',
    prisma : prismaData
  },{status : 201});
  
}