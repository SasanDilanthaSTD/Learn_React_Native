
import { tokenCache } from "@/cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import React from "react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error("Missing publishable key");
  }

const ClerkAndConvexProvider = ({children}: {children: React.ReactNode}) => {
    
  return (
    <ClerkProvider
          tokenCache={tokenCache}
          publishableKey={publishableKey}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ClerkLoaded>
                    {children}
                </ClerkLoaded>
            </ConvexProviderWithClerk>
        </ClerkProvider>
  )
}

export default ClerkAndConvexProvider