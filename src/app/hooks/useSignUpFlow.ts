import * as React from "react";
import { Alert } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function useSignUpFlow() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) return;
    if (!emailAddress || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error("SignUp error:", JSON.stringify(err, null, 2));
      Alert.alert("Sign up failed", err.errors?.[0]?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    if (!code) {
      Alert.alert("Error", "Please enter the verification code.");
      return;
    }

    setIsLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/"); // navigate to the main app
      } else {
        console.error("Verification incomplete:", JSON.stringify(signUpAttempt, null, 2));
        Alert.alert("Almost there", "Please complete the remaining steps.");
      }
    } catch (err: any) {
      console.error("Verify error:", JSON.stringify(err, null, 2));
      Alert.alert("Verification failed", err.errors?.[0]?.message ?? "Invalid code");
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    await handleSignUp();
  };

  return {
    // exposed state
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    code,
    setCode,
    pendingVerification,
    isLoading,
    // exposed actions
    handleSignUp,
    handleVerify,
    resendCode,
  };
}
