import { Redirect, Slot } from 'expo-router';
 
export default function _Layout() {
  const isAuth = false;

  if(!isAuth) return <Redirect href="/sign-in" />
  return <Slot />
}