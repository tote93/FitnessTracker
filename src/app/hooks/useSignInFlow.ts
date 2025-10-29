import * as React from "react";
import { Alert } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function useSignInFlow() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignIn = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/"); // logged in → home
      } else {
        console.error("Sign in incomplete:", JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Additional steps required", "Please follow the next steps to finish signing in.");
      }
    } catch (err: any) {
      console.error("Sign in error:", JSON.stringify(err, null, 2));
      Alert.alert("Sign in failed", err.errors?.[0]?.message ?? "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    isLoading,
    handleSignIn,
  };
}
