// Fetch Api calls for the frontend
import axios from "axios";
import { setUserData, clearUserData } from "../redux/userSlice";

const serverUrl = "https://intellinoteserver.onrender.com";

// ✅ Current user fetch
export const getCurrentUser = async (dispatch) => {
    try {
        const result = await axios.get(serverUrl + "/api/user/currentUser", {
            withCredentials: true
        });
        dispatch(setUserData(result.data));
    } catch (error) {
        if (error.response?.status === 401) {
            dispatch(clearUserData());
            return;
        }
        console.error("Error fetching current user:", error);
    }
};

// ✅ Generate notes API call
export const generateNotes = async (payload, dispatch) => {
    try {
        const token = localStorage.getItem("token"); // ✅ ADD THIS

        const result = await axios.post(
            serverUrl + "/api/notes/generate-notes",
            payload,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}` // ✅ ADD THIS
                }
            }
        );

        const responseData = result.data;

        if (dispatch && responseData.creditsLeft !== undefined) {
            dispatch(setUserData({ credits: responseData.creditsLeft }));
        }

        return responseData;

    } catch (error) {
        console.error("Generate Notes Error:", error.response?.data || error.message);
        throw error;
    }
};

export const downloadPdf = async (result) => {
    try {

        const response = await axios.post(
            serverUrl + "/api/pdf/generate-pdf",
            { result },
            { responseType: "blob", withCredentials: true }
        );

        const blob = new Blob([response.data], {
            type: "application/pdf"
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "IntelliNote.pdf";
        link.click();

        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error(error);
        throw new Error("PDF Download Failed");
    }
};
