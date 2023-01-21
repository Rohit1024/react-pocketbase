import pb from "../lib/pocketbase";
import { useMutation } from "@tanstack/react-query";

export default function useRegister() {
  async function register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const authData = await pb.collection("users").create({
      email: email,
      password: password,
      passwordConfirm: password,
    });
    console.log(authData);
  }

  return useMutation(register);
}
