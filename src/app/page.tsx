import { redirect } from 'next/navigation';

export default async function Page() {
  if(localStorage.getItem('userToken')){
    redirect('/dashboard/overview');
  }else{
    redirect('/auth/sign-in');
  }
}
