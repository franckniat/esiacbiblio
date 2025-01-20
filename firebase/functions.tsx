import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";

export const getStringOfFile = async (file: File, fileRef:string) => {
    const storageRef = ref(storage, fileRef);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}

export const deleteFile = async (fileRef:string) => {
    const storageRef = ref(storage, fileRef);
    await deleteObject(storageRef);
    return;
}
