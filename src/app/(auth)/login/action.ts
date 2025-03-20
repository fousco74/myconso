'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { prisma } from '@/utils/prisma'
import { createClient } from '@/app/utils/supabase/server'



export async function login(formData: FormData) {

  const supabase = await createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return redirect("/login?error=Veuillez remplir tous les champs.");
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return redirect("/login?error=Email ou mot de passe incorrect.");
  }

  revalidatePath('/', 'layout')

  redirect("/");
}


export async function signup(nom_complet: string, email: string, password: string, client_id: number, role: number) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: email,
    password: password,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  const user = await createUser(nom_complet, email, password, client_id, Number(role));

  if(!user){
    redirect('/error')
  }


  revalidatePath('/', 'layout')
  redirect('/')

}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/login") 
  }

  export async function getUser() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
  
    if (error || !data?.user) return null

    const email = data?.user?.email;


    const userData = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        role: true,
        client: {
          include: {
            user:{
              include: {
                role: true,
              },
            },
            compteur: {
              include: {
                index: true,  
              }
            },
            consommation: true,
            index: true, 
          },
        },
       
      },
    });
    
    
  
    return userData 
  }