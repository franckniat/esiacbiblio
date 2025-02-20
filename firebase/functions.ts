import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";

/**
 * Uploads a file to Firebase Storage and returns a URL for the uploaded file.
 * @param file The file to upload.
 * @param fileRef The reference to the file in Firebase Storage.
 * @returns A URL for the uploaded file.
 */
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
