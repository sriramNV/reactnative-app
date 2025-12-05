import { Redirect, Slot } from 'expo-router';
 
export default function _Layout() {
  const isAuth = true;

  if(!isAuth) return <Redirect href="/sign-in" />
  return <Slot />
}