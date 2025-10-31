import "../global.css";
import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { QueryClientProvider } from "@tanstack/react-query";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { queryClient } from "@/react-query";

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache}>
        <Slot />
      </ClerkProvider>
    </QueryClientProvider>
  );
}