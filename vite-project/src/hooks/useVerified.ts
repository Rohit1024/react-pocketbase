import { useQuery } from "@tanstack/react-query";
import pb from "../lib/pocketbase";
export default function useVerified() {
    const id = pb.authStore.model?.id;

    async function checkVerified() {
        const userData = await pb.collection("users").getOne(id!);
        return userData.verified.toString();
    }
    return useQuery({ queryFn: checkVerified, queryKey: ["checkVerified", id]});
}

export async function requestVerfication() {
    const email = pb.authStore.model?.email
    const response = await pb.collection("users").requestVerification(email);
    if(response) alert("Verification Email sent! Please check your inbox.");
}