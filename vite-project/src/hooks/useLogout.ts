import { useState } from "react";
import pb from "../lib/pocketbase";

export default function useLogout() {
    const [dummy, setdummy] = useState(0);
    return function logout() {
        pb.authStore.clear();
        setdummy(Math.random());
    }
}